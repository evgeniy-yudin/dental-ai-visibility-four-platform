/** Conservative, deterministic navigation proxies. Not page-quality scores. */
export function normalizeUrl(input) {
  try {
    const value = new URL(input);
    if (!['http:','https:'].includes(value.protocol) || value.username || value.password) return null;
    value.hostname=value.hostname.toLowerCase().replace(/^www\./,'');
    value.hash='';
    for (const key of [...value.searchParams.keys()]) if (/^utm_/i.test(key)||/^(gclid|fbclid|msclkid|_ga|_gl)$/i.test(key)) value.searchParams.delete(key);
    value.pathname=value.pathname.replace(/\/+$/,'')||'/';
    if(value.protocol==='https:'&&value.port==='443')value.port='';
    return value.href;
  } catch { return null; }
}

export function classifyUrl(input) {
  const normalized=normalizeUrl(input);if(!normalized)return 'unclassified';
  const url=new URL(normalized),host=url.hostname;
  let p=url.pathname.toLowerCase();try{p=decodeURIComponent(p);}catch{/* Preserve malformed percent escapes literally. */}
  const knownDirectory=/(^|\.)(yelp\.com|healthgrades\.com|zocdoc\.com|opencare\.com|toprateddentist\.com|expertise\.com|facebook\.com|instagram\.com|youtube\.com|reddit\.com|tiktok\.com|linkedin\.com|yellowpages\.com|mapquest\.com|dentistry\.com|realself\.com|vitals\.com|carecredit\.com|sharecare\.com|ratemds\.com|dentalplans\.com|tebra\.com|navmds\.com|bestinhood\.com)$/;
  if(knownDirectory.test(host))return 'directory_social';
  if(p==='/')return 'homepage';
  if(/\/(blog|blogs|articles?|news|resources?)(\/|-|$)/.test(p))return 'editorial';
  if(/(veneers?|implants?|cosmetic[-_]dent|emergency[-_]dent|urgent[-_]dent|dental[-_]emergenc|\/(services?|treatments?)(\/|-|$))/.test(p))return 'treatment';
  if(/\/(locations?|offices?|contact[-_]?us|contact|find[-_]us)(\/|-|$)/.test(p)||/\/dentist\/[a-z]{2}\//.test(p))return 'location';
  if(/\/(meet[-_/]|our[-_](dentists?|doctors?|team)(\/|-|$)|team(\/|-|$)|staff(\/|-|$)|about[-_]us\/[^/]*(doctor|dentist|team))/.test(p)||/\/dr[-_][^/]+(?:\/|$)/.test(p)||/\/(dentists?|doctors?|providers?)\/[a-z]+(?:-[a-z]+)+(?:\/)?$/.test(p))return 'dentist_team';
  return 'unclassified';
}
