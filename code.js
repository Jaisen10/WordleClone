// add stats: how many played, win pecentage, current streak, max streak
// add key buttons

class Game
{
  static theWord = [];
  static word = [];
  static row = 0;
  static going;
  static newList = createList();
  static repeatList = [];
  static index = 0;
  static len = Math.ceil(Game.newList.length / 2);
  static shortList = Game.newList.length == 1;
}

let b = document.createElement("div");
b.id = "board";
let w = document.createElement("div");
b.appendChild(w);
w.style.position="relative";
w.style.top="0px";
w.style.font="40px Alfa Slab One";
w.style.userSelect="none";
w.innerText="Wordle";
document.body.appendChild(b);
makeBoard();

positionBoard();
setInterval(positionBoard, 10);

onkeydown=function(event)
{
  if (Game.going == 1) {
    let k = event.key;
    if (k.length == 1 && k.toUpperCase() != k.toLowerCase() && Game.word.length < 5) {setLetter(k);}
    if (k == "Enter" && Game.word.length > 4) {turnRow();}
    if (k == "Backspace" && Game.word.length > 0) {deleteLetter();}
  }
};

function turnRow()
{
  turnLetter(0, Game.row);
  setTimeout(turnLetter, 100, 1, Game.row);
  setTimeout(turnLetter, 200, 2, Game.row);
  setTimeout(turnLetter, 300, 3, Game.row);
  setTimeout(turnLetter, 400, 4, Game.row);
  
  let c=1;
  for (let i=0; i<5; i++)
  {if (Game.theWord[i] != Game.word[i].toLowerCase()) {c=0;}}
  
  Game.row++;
  Game.word = [];
  if (Game.row > 5) {Game.going = 2;}
  if (c==1) {Game.going = 3}
  if (Game.row > 5 || c==1) {end();}
}

function turnLetter(x, y)
{
  let square = y.toString() + "$" + x.toString();
  square = document.getElementById(square);
  square.style.animationDuration="0.6s";
  square.style.animationName="flip";
  k = square.innerText.toLowerCase();
  let color = "gray";
  if (Game.theWord.includes(k)) {color="#b0aa3a";}
  if (Game.theWord[x]==k) {color="#349954";}
  setTimeout(function()
  {
    square.style.color="white";
    square.style.backgroundColor=color;
    square.style.borderColor=square.style.backgroundColor;
  }, 300);
}

function setLetter(k)
{
  Game.word[Game.word.length] = k;
  let r = Game.row.toString();
  let c = (Game.word.length - 1).toString();
  r = r + "$" + c;
  let square = document.getElementById(r);
  square.innerText=k.toUpperCase();
  square.style.borderColor="black";
  square.style.animationDuration="0.3s";
  square.style.animationName="key";
}

function deleteLetter()
{
  Game.word.pop();
  r = Game.row.toString() + "$" + Game.word.length.toString();
  document.getElementById(r).remove();
  
  let square = document.createElement("div");
  square.className="square";
  square.id = r;
  square.style.left=(Game.word.length*70).toString()+"px";
  square.style.top=(Game.row*70 + 70).toString()+"px";
  document.getElementById("board").appendChild(square);
}

function end()
{
  setTimeout(function()
  {
    let c = document.createElement("div");
    document.getElementById("board").appendChild(c);
    c.className="correct";
    let text = Game.theWord[0] + Game.theWord[1] + Game.theWord[2] + Game.theWord[3] + Game.theWord[4];
    text = text.toUpperCase();
    c.innerText="Answer: " + text;
    c.style.position="relative";
    c.style.top="-5px";
    c.style.font="900 20px Helvetica";
    c.style.color="white";
    c.style.backgroundColor="#eb831a";
    c.style.animationDuration="0.1s";
    c.style.animationName="fadeIn";
    c.style.userSelect="none";
    if (Game.going == 3) {c.style.visibility="hidden";}
  }, 800);
  
  setTimeout(function()
  {
    let c = document.createElement("div");
    document.getElementById("board").appendChild(c);
    c.className="button";
    c.innerText="Play Again";
    c.style.position="relative";
    c.style.top="-80px";
    c.style.font="900 30px Helvetica";
    c.style.color="white";
    c.style.backgroundColor="#349954";
    c.style.cursor="pointer";
    c.style.animationDuration="0.1s";
    c.style.animationName="fadeIn";
    c.style.userSelect="none";
    
    setTimeout(function()
    {
      c.onmousedown = function() {c.style.backgroundColor="#26703e";};
      c.onmouseup = function() {c.style.backgroundColor="#349954";};
      c.onmouseout = function() {c.style.backgroundColor="#349954";};
      c.onclick = function() {setTimeout(reset, 100);};
    }, 100);
  }, 1000);
}

function makeBoard()
{
  Game.going = 1;
  let w;
  if (Game.shortList) {w = Game.newList[0];}
  else
  {
    let ind = Math.floor(Math.random() * Game.newList.length);
    w = Game.newList[ind];
    Game.newList.splice(ind, 1);
    if (Game.newList.length < Game.len)
    {
      Game.newList.splice(ind, 0, Game.repeatList[Game.index]);
      Game.repeatList.splice(Game.index, 1, w);
      Game.index++;
      if (Game.index >= Game.repeatList.length) {Game.index = 0;}
    } else {Game.repeatList.push(w);}
  }
  
  Game.theWord[0] = w.charAt(0);
  Game.theWord[1] = w.charAt(1);
  Game.theWord[2] = w.charAt(2);
  Game.theWord[3] = w.charAt(3);
  Game.theWord[4] = w.charAt(4);
  
  for (let i=0; i<6; i++)
  {
    for (let n=0; n<5; n++)
    {
      let square = document.createElement("div");
      square.className="square";
      square.id = i.toString() + "$" + n.toString();
      document.getElementById("board").appendChild(square);
      square.style.left=(n*70).toString()+"px";
      square.style.top=(i*70 + 70).toString()+"px";
    }
  }
}

function reset()
{
  Game.row = 0;
  Game.word = [];
  let b = document.getElementById("board");
  let squares = document.querySelectorAll(".square");
  squares.forEach(square => {square.remove();});
  squares = document.querySelectorAll(".correct");
  squares.forEach(square => {square.remove();});
  squares = document.querySelectorAll(".button");
  squares.forEach(square => {square.remove();});
  makeBoard();
}

function positionBoard()
{
  if (window.innerWidth >= 380)
  {
    document.body.style.overflowX="hidden";
    document.getElementById("board").style.left="calc(50% - 172px)";
  }
  else
  {
    document.body.style.overflowX="scroll";
    document.getElementById("board").style.left="10px";
  }
  
  if (window.innerHeight >= 494)
  {
    document.body.style.overflowY="hidden";
    document.getElementById("board").style.top="calc(50% - 247px)";
  }
  else
  {
    document.body.style.overflowY="scroll";
    document.getElementById("board").style.top="0px";
  }
}

function createList()
{
  return ["cigar","rebut","humph","awake","blush","focal","evade","naval","serve","heath","dwarf","model","karma","grade","quiet","bench","abate","feign","major","death","fresh","crust","abase","marry","react","batty","pride","floss","helix","croak","staff","paper","unfed","whelp","trawl","outdo","adobe","crazy","sower","repay","digit","crate","cluck","spike","mimic","pound","maxim","linen","unmet","flesh","booby","forth","first","stand","belly","ivory","seedy","print","yearn","drain","bribe","stout","panel","crass","flume","offal","agree","error","swirl","argue","bleed","delta","flick","totem","wooer","front","shrub","parry","biome","lapel","start","greet","goner","golem","lusty","loopy","round","audit","lying","gamma","labor","islet","civic","forge","corny","moult","basic","salad","agate","spicy","spray","essay","fjord","spend","kebab","guild","aback","motor","alone","hatch","hyper","thumb","dowry","ought","belch","dutch","pilot","tweed","comet","jaunt","enema","steed","abyss","growl","fling","dozen","boozy","erode","world","gouge","click","briar","great","altar","pulpy","blurt","coast","duchy","groin","fixer","group","rogue","badly","smart","pithy","gaudy","chill","heron","vodka","finer","surer","radio","rouge","perch","retch","wrote","clock","tilde","store","prove","bring","solve","cheat","grime","exult","usher","epoch","triad","break","rhino","viral","conic","masse","sonic","vital","trace","using","peach","champ","baton","brake","pluck","craze","gripe","weary","picky","acute","ferry","aside","tapir","troll","unify","rebus","boost","truss","siege","tiger","banal","slump","crank","gorge","query","drink","favor","abbey","tangy","panic","solar","shire","proxy","point","robot","prick","wince","crimp","knoll","sugar","whack","mount","perky","could","wrung","light","those","moist","shard","pleat","aloft","skill","elder","frame","humor","pause","ulcer","ultra","robin","cynic","aroma","caulk","shake","dodge","swill","tacit","other","thorn","trove","bloke","vivid","spill","chant","choke","rupee","nasty","mourn","ahead","brine","cloth","hoard","sweet","month","lapse","watch","today","focus","smelt","tease","cater","movie","saute","allow","renew","their","slosh","purge","chest","depot","epoxy","nymph","found","shall","stove","lowly","snout","trope","fewer","shawl","natal","comma","foray","scare","stair","black","squad","royal","chunk","mince","shame","cheek","ample","flair","foyer","cargo","oxide","plant","olive","inert","askew","heist","shown","zesty","trash","larva","forgo","story","hairy","train","homer","badge","midst","canny","fetus","butch","farce","slung","tipsy","metal","yield","delve","being","scour","glass","gamer","scrap","money","hinge","album","vouch","asset","tiara","crept","bayou","atoll","manor","creak","showy","phase","froth","depth","gloom","flood","trait","girth","piety","goose","float","donor","atone","primo","apron","blown","cacao","loser","input","gloat","awful","brink","smite","beady","rusty","retro","droll","gawky","hutch","pinto","egret","lilac","sever","field","fluff","flack","agape","voice","stead","stalk","berth","madam","night","bland","liver","wedge","augur","roomy","wacky","flock","angry","trite","aphid","tryst","midge","power","elope","cinch","motto","stomp","upset","bluff","cramp","quart","coyly","youth","rhyme","buggy","alien","smear","unfit","patty","cling","glean","label","hunky","khaki","poker","gruel","twice","twang","shrug","treat","waste","merit","woven","needy","clown","widow","irony","ruder","gauze","chief","onset","prize","fungi","charm","gully","inter","whoop","taunt","leery","class","theme","lofty","tibia","booze","alpha","thyme","doubt","parer","chute","stick","trice","alike","recap","saint","glory","grate","admit","brisk","soggy","usurp","scald","scorn","leave","twine","sting","bough","marsh","sloth","dandy","vigor","howdy","enjoy","valid","ionic","equal","floor","catch","spade","stein","exist","quirk","denim","grove","spiel","mummy","fault","foggy","flout","carry","sneak","libel","waltz","aptly","piney","inept","aloud","photo","dream","stale","unite","snarl","baker","there","glyph","pooch","hippy","spell","folly","louse","gulch","vault","godly","threw","fleet","grave","inane","shock","crave","spite","valve","skimp","claim","rainy","pique","daddy","quasi","arise","aging","valet","opium","avert","stuck","recut","mulch","genre","plume","rifle","count","incur","total","wrest","mocha","deter","study","lover","safer","rivet","funny","smoke","mound","undue","sedan","pagan","swine","guile","gusty","equip","tough","canoe","chaos","covet","human","udder","lunch","blast","stray","manga","melee","lefty","quick","paste","given","octet","risen","groan","leaky","grind","carve","loose","sadly","spilt","apple","slack","honey","final","sheen","eerie","minty","slick","derby","wharf","spelt","coach","erupt","singe","price","spawn","fairy","jiffy","filmy","stack","chose","sleep","ardor","nanny","niece","woozy","handy","grace","ditto","stank","cream","usual","diode","valor","angle","ninja","muddy","chase","reply","prone","spoil","heart","shade","diner","arson","onion","sleet","dowel","couch","palsy","bowel","smile","evoke","creek","lance","eagle","idiot","siren","built","embed","award","dross","annul","goody","frown","patio","laden","humid","elite","lymph","edify","might","reset","visit","gusto","purse","vapor","crock","write","sunny","loath","chaff","slide","queer","venom","stamp","sorry","still","acorn","aping","pushy","tamer","hater","mania","awoke","brawn","swift","exile","birch","lucky","freer","risky","ghost","plier","lunar","winch","snare","nurse","house","borax","nicer","lurch","exalt","about","savvy","toxin","tunic","pried","inlay","chump","lanky","cress","eater","elude","cycle","kitty","boule","moron","tenet","place","lobby","plush","vigil","index","blink","clung","qualm","croup","clink","juicy","stage","decay","nerve","flier","shaft","crook","clean","china","ridge","vowel","gnome","snuck","icing","spiny","rigor","snail","flown","rabid","prose","thank","poppy","budge","fiber","moldy","dowdy","kneel","track","caddy","quell","dumpy","paler","swore","rebar","scuba","splat","flyer","horny","mason","doing","ozone","amply","molar","ovary","beset","queue","cliff","magic","truce","sport","fritz","edict","twirl","verse","llama","eaten","range","whisk","hovel","rehab","macaw","sigma","spout","verve","sushi","dying","fetid","brain","buddy","thump","scion","candy","chord","basin","march","crowd","arbor","gayly","musky","stain","dally","bless","bravo","stung","title","ruler","kiosk","blond","ennui","layer","fluid","tatty","score","cutie","zebra","barge","matey","bluer","aider","shook","river","privy","betel","frisk","bongo","begun","azure","weave","genie","sound","glove","braid","scope","wryly","rover","assay","ocean","bloom","irate","later","woken","silky","wreck","dwelt","slate","smack","solid","amaze","hazel","wrist","jolly","globe","flint","rouse","civil","vista","relax","cover","alive","beech","jetty","bliss","vocal","often","dolly","eight","joker","since","event","ensue","shunt","diver","poser","worst","sweep","alley","creed","anime","leafy","bosom","dunce","stare","pudgy","waive","choir","stood","spoke","outgo","delay","bilge","ideal","clasp","seize","hotly","laugh","sieve","block","meant","grape","noose","hardy","shied","drawl","daisy","putty","strut","burnt","tulip","crick","idyll","vixen","furor","geeky","cough","naive","shoal","stork","bathe","aunty","check","prime","brass","outer","furry","razor","elect","evict","imply","demur","quota","haven","cavil","swear","crump","dough","gavel","wagon","salon","nudge","harem","pitch","sworn","pupil","excel","stony","cabin","unzip","queen","trout","polyp","earth","storm","until","taper","enter","child","adopt","minor","fatty","husky","brave","filet","slime","glint","tread","steal","regal","guest","every","murky","share","spore","hoist","buxom","inner","otter","dimly","level","sumac","donut","stilt","arena","sheet","scrub","fancy","slimy","pearl","silly","porch","dingo","sepia","amble","shady","bread","friar","reign","dairy","quill","cross","brood","tuber","shear","posit","blank","villa","shank","piggy","freak","which","among","fecal","shell","would","algae","large","rabbi","agony","amuse","bushy","copse","swoon","knife","pouch","ascot","plane","crown","urban","snide","relay","abide","viola","rajah","straw","dilly","crash","amass","third","trick","tutor","woody","blurb","grief","disco","where","sassy","beach","sauna","comic","clued","creep","caste","graze","snuff","frock","gonad","drunk","prong","lurid","steel","halve","buyer","vinyl","utile","smell","adage","worry","tasty","local","trade","finch","ashen","modal","gaunt","clove","enact","adorn","roast","speck","sheik","missy","grunt","snoop","party","touch","mafia","emcee","array","south","vapid","jelly","skulk","angst","tubal","lower","crest","sweat","cyber","adore","tardy","swami","notch","groom","roach","hitch","young","align","ready","frond","strap","puree","realm","venue","swarm","offer","seven","dryer","diary","dryly","drank","acrid","heady","theta","junto","pixie","quoth","bonus","shalt","penne","amend","datum","build","piano","shelf","lodge","suing","rearm","coral","ramen","worth","psalm","infer","overt","mayor","ovoid","glide","usage","poise","randy","chuck","prank","fishy","tooth","ether","drove","idler","swath","stint","while","begat","apply","slang","tarot","radar","credo","aware","canon","shift","timer","bylaw","serum","three","steak","iliac","shirk","blunt","puppy","penal","joist","bunny","shape","beget","wheel","adept","stunt","stole","topaz","chore","fluke","afoot","bloat","bully","dense","caper","sneer","boxer","jumbo","lunge","space","avail","short","slurp","loyal","flirt","pizza","conch","tempo","droop","plate","bible","plunk","afoul","savoy","steep","agile","stake","dwell","knave","beard","arose","motif","smash","broil","glare","shove","baggy","mammy","swamp","along","rugby","wager","quack","squat","snaky","debit","mange","skate","ninth"];
}
