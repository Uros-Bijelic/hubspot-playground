import { relative } from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(" --file ")}`;

const lintStagedObj = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};

export default lintStagedObj;
