import { extract } from './keyword_extractor.js';
import tsData from '../data/ts.json' assert { type: 'json' };
import ngData from '../data/angular.json' assert { type: 'json' };
import bpData from '../data/bootstrap.json' assert { type: 'json' };

const technologiesKeywords = ['typescript', 'ts', 'angular', 'ng', 'bootstrap'];

const delimeter = ':';

const extractKeywords = (sentence) => {
  return extract(sentence, {
    language: 'french',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false
  });
};

const getTechData = (tech) => {
  switch (tech) {
    case 'typescript':
    case 'ts':
      return tsData;
    case 'angular':
    case 'ng':
      return ngData;
    case 'bootstrap':
      return bpData;
    default:
      return {};
  }
};

export const answerQuestion = (question) => {
  let keywords = extractKeywords(question.toLowerCase());
  let keyword = '';

  // techonologies level
  if (technologiesKeywords.some((k) => keywords.includes((keyword = k)))) {
    keywords = keywords.filter((el) => !technologiesKeywords.includes(el));
    let data = getTechData(keyword);

    // subject level
    if (keywords.length === 0) {
      return data['self'];
    }

    if (
      Object.keys(data).some((ks) =>
        (keyword = ks).split(delimeter).some((k) => keywords.includes(k))
      )
    ) {
      keywords = keywords.filter((el) => !keyword.includes(el));
      data = data[keyword];

      // action level
      if (keywords.length === 0) {
        return data['definition:def'];
      }

      if (
        Object.keys(data).some((ks) =>
          (keyword = ks).split(delimeter).some((k) => keywords.includes(k))
        )
      ) {
        return data[keyword];
      } else {
        return 'Je ne sais pas';
      }
    }

    return 'Je ne sais pas';
  }

  return 'Veuillez spécifier une technologie dans la question (technologies supportées: typescript, angular et bootstrap)';
};
