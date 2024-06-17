const data = require("./states.json");
const states = data.states;
let t = 0;

console.log(s.length);
let missMatch = [];
let one = {};
for (let i = 0; i < states.length; i++) {
  if (
    states[i].number_of_loksabha_constituencies !==
    states[i].loksabha_constituencies.length
  ) {
    t++;

    missMatch.push({
      name: states[i].name,
      cnt: states[i].loksabha_constituencies.length,
    });
  }
}
console.log(t, missMatch);
