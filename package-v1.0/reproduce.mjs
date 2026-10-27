/** Recompute the published dental citation-set results from sanitized inputs. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {normalizeUrl,classifyUrl} from './url-codebook.mjs';

const directory=path.resolve(process.argv[2]||import.meta.dirname);
const data=JSON.parse(fs.readFileSync(path.join(directory,'dental-ai-visibility-four-platform-v1.0.json'),'utf8'));
let checks=0;
const check=(condition,message)=>{checks++;assert.ok(condition,message);};
const equal=(actual,expected,message)=>{checks++;assert.deepEqual(actual,expected,message);};
const near=(actual,expected,message)=>{checks++;if(actual===null||expected===null)assert.equal(actual,expected,message);else assert.ok(Math.abs(actual-expected)<1e-12,`${message}: ${actual} != ${expected}`);};
const unique=values=>[...new Set(values)];
const mean=values=>values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;
const jac=(a,b)=>{const left=new Set(a),right=new Set(b),union=new Set([...left,...right]);return union.size?[...left].filter(value=>right.has(value)).length/union.size:null;};
const rows=data.responseMetrics;
equal(rows.length,216,'Core observations');equal(data.promptCells.length,18,'Fixed exact queries');
equal(unique(rows.map(row=>row.observation)).length,216,'Unique observation keys');
equal(data.withinPairs.length,216,'Planned repeat pairs');equal(data.crossPairs.length,324,'Planned cross-platform pairs');
equal(data.qualitativeSlots.length,36,'Fixed qualitative selection slots');
check(!rows.some(row=>row.status==='not_collected'),'Every planned core check has a recorded outcome');
equal(data.study.firstPassRequests,rows.filter(row=>row.attemptCount>0).length,'First-pass request count');
equal(data.study.recoveryRequests,rows.filter(row=>row.recoveryAttempted).length,'Recovery request count');
equal(data.study.totalCoreRequests,rows.reduce((total,row)=>total+row.attemptCount,0),'Total core requests are not confused with observation slots');
equal(data.study.firstPassFailures,rows.filter(row=>row.firstPassStatus==='collection_failed').length,'First-pass failures retained');
equal(data.study.recoveredCaptures,rows.filter(row=>row.recovered).length,'Recovered capture count');
const citationsByObservation=new Map(rows.map(row=>[row.observation,data.citations.filter(citation=>citation.observation===row.observation)]));
for(const row of rows){
  const citations=citationsByObservation.get(row.observation);
  equal(citations.length,row.sourceUrls,`${row.observation}: URL count`);
  equal(unique(citations.map(citation=>citation.url)).length,citations.length,`${row.observation}: deduplicated URL rows`);
  equal(unique(citations.map(citation=>citation.domain)).length,row.sourceDomains,`${row.observation}: hostname count`);
  equal(row.answerPresent,row.status==='answer',`${row.observation}: answer state`);
  equal(row.attemptCount,1+Number(row.recoveryAttempted),`${row.observation}: request attempts`);
  if(row.recoveryAttempted){equal(row.firstPassStatus,'collection_failed',`${row.observation}: recovery eligibility`);check(Boolean(row.recoveryCollectedAt),`${row.observation}: recovery timestamp retained`);}
  if(row.status!=='answer')equal(citations.length,0,`${row.observation}: nonanswer cannot supply answer citations`);
  for(const citation of citations){equal(new URL(citation.url).hostname,citation.domain,`${row.observation}: URL hostname`);equal(normalizeUrl(citation.url),citation.url,`${row.observation}: URL normalization`);equal(classifyUrl(citation.url),citation.type,`${row.observation}: URL codebook category`);}
}
const byId=new Map(rows.map(row=>[row.observation,row]));
const recomputePair=pair=>{
  const a=byId.get(pair.observationA),b=byId.get(pair.observationB);check(Boolean(a&&b),'Pair refers to existing observations');
  const eligible=a.status==='answer'&&b.status==='answer';
  const ca=citationsByObservation.get(a.observation),cb=citationsByObservation.get(b.observation);
  const url=eligible?jac(ca.map(c=>c.url),cb.map(c=>c.url)):null;
  const domain=eligible?jac(ca.map(c=>c.domain),cb.map(c=>c.domain)):null;
  equal(pair.answerPair,eligible,`${pair.pair}: eligible`);near(pair.urlJaccard,url,`${pair.pair}: exact URL Jaccard`);near(pair.domainJaccard,domain,`${pair.pair}: hostname Jaccard`);
  equal(pair.bothSourceNonempty,eligible&&ca.length>0&&cb.length>0,`${pair.pair}: nonempty sensitivity membership`);
  equal(pair.emptySourceSides,eligible?Number(ca.length===0)+Number(cb.length===0):null,`${pair.pair}: empty-source sides`);
  return {...pair,urlJaccard:url,domainJaccard:domain};
};
const within=data.withinPairs.map(recomputePair),cross=data.crossPairs.map(recomputePair);
for(const summary of data.platformSummary){
  const group=rows.filter(row=>row.platform===summary.platform),pairs=within.filter(pair=>pair.platform===summary.platform),citations=group.flatMap(row=>citationsByObservation.get(row.observation));
  equal(group.length,54,`${summary.platform}: fixed planned denominator`);
  for(const [key,value]of Object.entries({planned:group.length,answers:group.filter(row=>row.status==='answer').length,noAnswer:group.filter(row=>row.status==='no_answer').length,failed:group.filter(row=>row.status==='collection_failed').length,sourceBearing:group.filter(row=>row.sourceUrls>0).length,sourceUrlOccurrences:citations.length,uniqueUrls:unique(citations.map(c=>c.url)).length,uniqueDomains:unique(citations.map(c=>c.domain)).length,withinPairs:pairs.length,definedDomainPairs:pairs.filter(pair=>pair.domainJaccard!==null).length}))equal(summary[key],value,`${summary.platform}: ${key}`);
  near(summary.meanUrlJaccard,mean(pairs.map(pair=>pair.urlJaccard).filter(value=>value!==null)),`${summary.platform}: URL mean`);
  near(summary.meanDomainJaccard,mean(pairs.map(pair=>pair.domainJaccard).filter(value=>value!==null)),`${summary.platform}: hostname mean`);
  near(summary.meanBothNonemptyDomainJaccard,mean(pairs.filter(pair=>pair.bothSourceNonempty).map(pair=>pair.domainJaccard)),`${summary.platform}: both-nonempty mean`);
}
for(const summary of data.intentSummary){
  const group=rows.filter(row=>row.platform===summary.platform&&row.intent===summary.intent);
  equal(group.length,18,'Platform–task planned denominator');equal(summary.answers,group.filter(row=>row.status==='answer').length,'Platform–task answer count');equal(summary.sourceBearing,group.filter(row=>row.sourceUrls>0).length,'Platform–task source-bearing count');
}
for(const summary of data.crossPlatformSummary){
  const pairs=cross.filter(pair=>pair.platformA===summary.platformA&&pair.platformB===summary.platformB);
  equal(pairs.length,54,'Matched platform pair denominator');near(summary.meanDomainJaccard,mean(pairs.map(pair=>pair.domainJaccard).filter(value=>value!==null)),'Matched platform mean');
  near(summary.meanBothNonemptyDomainJaccard,mean(pairs.filter(pair=>pair.bothSourceNonempty).map(pair=>pair.domainJaccard)),'Matched both-nonempty mean');
}
for(const summary of data.sourceTypeSummary){const group=data.citations.filter(c=>c.platform===summary.platform);equal(summary.denominator,group.length,'URL-type denominator');equal(summary.count,group.filter(c=>c.type===summary.type).length,'URL-type count');near(summary.share,group.length?summary.count/group.length:null,'URL-type share');}
for(const slot of data.qualitativeSlots){
  const cell=data.promptCells.find(cell=>cell.city===slot.city&&cell.intent===slot.intent);
  equal(slot.queryCell,cell.cell,'Qualitative source uses first plan-ordered wording');
  const row=rows.find(row=>row.queryCell===cell.cell&&row.platform===slot.platform&&row.wave===1);
  const first=citationsByObservation.get(row.observation).sort((a,b)=>a.sourceOrder-b.sourceOrder)[0];
  equal(slot.url,first?.url||null,'Qualitative source is first declared citation or empty slot');
}
if(data.qualitativeReviewCounts){
  const inspected=data.qualitativeSlots.filter(slot=>slot.reviewStatus==='inspected_static_page'&&slot.manualReview===true);
  equal(data.qualitativeReviewCounts.slots,data.qualitativeSlots.length,'Qualitative slots counted');
  equal(data.qualitativeReviewCounts.selectedSources,data.qualitativeSlots.filter(slot=>slot.url).length,'Selected source count');
  equal(data.qualitativeReviewCounts.inspectedPages,inspected.length,'Inspected static-page count');
  for(const [key,field]of [['treatment','treatmentEvidence'],['dentist','dentistEvidence'],['location','locationEvidence'],['contact','contactEvidence'],['priceQualification','priceQualificationEvidence']])equal(data.qualitativeReviewCounts[key],inspected.filter(slot=>slot[field]===true).length,`Qualitative positive ${key}`);
}
console.log(JSON.stringify({status:'PASS',checks,observations:rows.length,withinPairs:within.length,crossPairs:cross.length,citations:data.citations.length,qualitativeSlots:data.qualitativeSlots.length}));
