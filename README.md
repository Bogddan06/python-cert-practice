# Python Practice

A personal practice space for the six Certiport IT Specialist Python objective areas, with extra emphasis on hands-on coding for next-generation performance-based questions.

## Simple study flow

The main screen offers two choices: **Quizzes** and **Exam quizzes**. Practice has the two original sets plus a 10-question mixed quiz, with one question at a time and instant explanations. Exam quizzes offer either 20 questions in 25 minutes or a next-generation practice with 20 questions and two coding tasks in 30 minutes. Results include answer review and a retry option for missed questions. Existing saved study data is retained. Source material and standalone labs remain available at their existing deep links.

## Included

- 66 imported HTML questions: multiple choice, multiple response, true/false, and code completion.
- 24 original coding labs with 86 executable checks, hints, and reference solutions.
- A 30-minute mixed practice session: 10 questions, 2 labs, then 10 questions. This is a custom study format, not an exact exam simulator or official score prediction.
- A searchable library of 310 Python exercise images extracted from the two supplied ZIPs; both supplied PDFs and the 70-page PDF inside the worksheet ZIP remain available as references. Other subject folders were intentionally excluded.
- One-question practice, explanations, missed-question retries, partial selection scores, saved quiz sessions, lab drafts, and local progress with JSON export/import.
- A Python runtime using Pyodide in a module Web Worker, a stop button, and a 15-second execution limit. Files are temporary and reset each run. Initial runtime loading requires internet access.

## Run locally

Use Python 3 and Node.js for syntax validation. There are no npm dependencies.

```sh
npm run dev
npm run check
```

Open http://localhost:4173. Serve over HTTP; opening index.html directly will not load the JSON files or worker correctly.

## Hosting

Deploy the repository on Vercel with framework Other and output directory `public`. `vercel.json` supplies these settings. GitHub integration deploys updates to the production branch automatically.

All study data and drafts remain in localStorage in the current browser. There is no account, cloud sync, server database, or analytics. Export progress before switching browsers. Browser execution is for personal practice, not a security boundary for hostile programs. The Python runtime is fetched from the official Pyodide distribution on jsDelivr; fonts are loaded from Google Fonts with system fallbacks.

## Sources and corrections

The source HTML is the answer key for imported questions; the PDFs are matching references rather than additional unique questions. Quiz explanations are in Romanian, as provided; the interface, original labs, and lab hints are in English. Exercise image OCR is used for searching, and images remain the authority where OCR is imperfect.

Three imported source defects were corrected: the digit-count example now consistently uses strings; the arithmetic question explicitly prints its result; and the format-string answer preserves the exact whitespace. Any source correction is shown on its question. Repeated questions in the original sets are retained with their original numbering.

Original files were supplied by the site owner for their study use. No official exam questions were fetched. The app is independent and is not affiliated with Certiport or Pearson. Original labs are practice activities, not reproductions of the exam environment.

Objective references:

- [Certiport Python next-generation update](https://gocertiport.pearsonvue.com/pythonexamupdate)
- [Pearson IT Specialist Python objectives](https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-303-python-pearson.pdf)
- [Pyodide Web Worker documentation](https://pyodide.org/en/stable/usage/webworker.html)
