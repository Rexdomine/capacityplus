const evidenceValues = ["150+ ABPMs", "75 GP clinical hours", "£8,000"];
const qualification = [
  "single-site St Giles pilot",
  "approximately 8,000 patients",
  "year one",
];

const pharmacyPilotPath = ".next/server/app/for-pharmacies.html";
const approvedPharmacyPilotSentence =
  "In the St Giles pilot, the partner pharmacy generated approximately £8,000 in NHS revenue in year one from 150+ ABPMs and associated case-finding activity.";

const normalize = (value) => value.replace(/\s+/g, " ").trim();
const lowerCase = (value) => value.toLocaleLowerCase("en-GB");
const nonRenderedElements = new Set(["script", "style", "template"]);
const voidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function tagEnd(content, start) {
  let quote;
  for (let index = start; index < content.length; index += 1) {
    const character = content[index];
    if (quote) {
      if (character === quote) quote = undefined;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === ">") {
      return index;
    }
  }
  return content.length - 1;
}

function extractBuiltVisibleText(content) {
  const visibleParts = [];
  const elements = [];
  let excludedDepth = 0;
  let cursor = 0;

  while (cursor < content.length) {
    const tagStart = content.indexOf("<", cursor);
    if (tagStart === -1) {
      if (excludedDepth === 0) visibleParts.push(content.slice(cursor));
      break;
    }
    if (excludedDepth === 0) visibleParts.push(content.slice(cursor, tagStart));

    if (content.startsWith("<!--", tagStart)) {
      const commentEnd = content.indexOf("-->", tagStart + 4);
      cursor = commentEnd === -1 ? content.length : commentEnd + 3;
      continue;
    }

    const end = tagEnd(content, tagStart + 1);
    const tag = content.slice(tagStart + 1, end).trim();
    const closingMatch = tag.match(/^\/\s*([^\s/>]+)/);

    if (closingMatch) {
      const name = lowerCase(closingMatch[1]);
      const matchingIndex = elements.findLastIndex(
        (element) => element.name === name,
      );
      if (matchingIndex !== -1) {
        for (const element of elements.splice(matchingIndex)) {
          if (element.excluded) excludedDepth -= 1;
        }
      }
    } else if (!tag.startsWith("!") && !tag.startsWith("?")) {
      const openingMatch = tag.match(/^([^\s/>]+)/);
      if (openingMatch) {
        const name = lowerCase(openingMatch[1]);
        const attributes = tag.slice(openingMatch[0].length);
        const excluded =
          nonRenderedElements.has(name) ||
          /(?:^|\s)hidden(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?(?=\s|\/?$)/i.test(
            attributes,
          ) ||
          /(?:^|\s)aria-hidden\s*=\s*(?:"true"|'true'|true)(?=\s|\/?$)/i.test(
            attributes,
          );

        if (!voidElements.has(name) && !/\/\s*$/.test(tag)) {
          elements.push({ name, excluded });
          if (excluded) excludedDepth += 1;
        }
      }
    }

    cursor = end + 1;
  }

  return visibleParts.join(" ");
}

export function extractVisibleText(content, builtMode) {
  const visibleContent = builtMode ? extractBuiltVisibleText(content) : content;

  return normalize(visibleContent.replace(/<[^>]*>/g, " "));
}

export function evidenceQualificationErrors(file, visibleText) {
  const normalizedText = normalize(visibleText);
  const evidenceText =
    file === pharmacyPilotPath
      ? normalizedText.replace(approvedPharmacyPilotSentence, "")
      : normalizedText;

  if (!evidenceValues.some((value) => evidenceText.includes(value))) return [];

  return qualification.filter(
    (term) => !lowerCase(normalizedText).includes(lowerCase(term)),
  );
}
