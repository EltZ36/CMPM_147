// project.js - purpose and description here
// Author: Elton Zeng
// Date: 4/7/24 

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

function main() {
  const fillers = {
    day: [12,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,
  30,],
    month: [1,2,3,4,5,6,7,8,9,10,11,12],
    year: ["2169",
  "2041",
  "2158",
  "2139",
  "2232",
  "2205",
  "2246",
  "2272",
  "2287",
  "2019",
  "2293",
  "2118",
  "2134",
  "2257",
  "2045",
  "2075",
  "2086",
  "2123",
  "2074",
  "2128",
  "2125",
  "2012",
  "2052",
  "2114",
  "2020",
  "2249",
  "2279",
  "2284",
  "2112",
  "2116",], 
    sendNumStreet: [1990,2132,3,4,5,62,74,8,9,10,11,12,1323,14,165,146,137,128,129,20, 900, 800],
    recipNumStreet: [178,112,2323,423,5,6,27,48,9,10,11,12,1534,14,158,196,117,18,19,208],
    sendZipCode: ["78613",
  "78617",
  "78620",
  "78628",
  "78641",
  "78645",
  "78652",
  "78701",
  "78702",
  "78703",
  "78704",
  "78705",
  "78717",
  "78721",
  "78722",
  "78723",
  "78724",
  "78726",
  "78728",
  "78731",
  "78732",
  "78733",
  "78734",
  "78735",
  "78737",
  "78738",
  "78739",
  "78741",
  "78744",
  "78745",
  "78745",
  "78748",
  "78749",
  "78750",
  "78751",
  "78752",
  "78753",
  "78754",
  "78756",
  "78757",
  "78758",
  "78759"], 
    recipZipCode: [95060, 95065, 95062, 95063, 95064],
    streetName: ["Airport_Blvd",
  "Alta_Dr",
  "Altivo_Ave",
  "Amaya_Ridge_Rd",
  "Aptos_Creek_Rd",
  "Bear_Creek_Canyon_Rd",
  "Bear_Creek_Way",
  "Bielwaski_Rd",
  "Big_Basin_Way",
  "Buena_Vista_Dr",
  "Cabrillo_College_Dr",
  "Calabasas_Rd",
  "Capitola_Ave",
  "Carlton_Rd",
  "Casserly_Rd",
  "China_Grade_Rd",
  "Courtney_Ln",
  "Covenant_Ln",
  "Crest_Ln",
  "Cresta_Way",
  "Daffodil_Ct",
  "Dons_Rd",
  "Driveway",
  "E_Zayante_Rd",
  "El_Alamein_Rd",
  "Fallenrock",
  "Farri_Creek",
  "Farri_Rd",
  "Freedom_Blvd",
  "Gazos_Creek_Rd",
  "Giesen_Rd",
  "Green_Valley_Rd",
  "Hames_Rd",
  "Heide_Ln",
  "Hidden_Springs_Ln",
  "Hihns_Sulphur_Spring_Rd",
  "Hilton_Dr",
  "Hwy_35",
  "Inscho_Rd",
  "Lakewood_Dr",
  "Lakewood_Rd",
  "Loma_Chiquita_Rd",
  "Loma_Prieta_Ave",
  "Loma_Prieta_Rd",
  "Loma_Prieta_Way",
  "Lompico_Rd",
  "Lost_Valley_Rd",
  "Main_Blvd",
  "Mcadams_Ln",
  "Mello_Hollow_Rd",
  "Moon_Meadow_Ln",
  "Mountain_Charlie_Rd",
  "Mountain_Lion_Rd",
  "Mt_Madonna_Rd",
  "Old_Princehanes_Rd",
  "Old_Ridge_Rd",
  "Old_Santa_Cruz_Hwy",
  "Old_Summit_Rd",
  "Old_Womans_Creek_Rd",
  "Playa_Blvd",
  "Quail_Hollow_Rd",
  "Ramsey_Rd",
  "Riverside_Rd",
  "Rons_Rd",
  "Rosebloom_Ave",
  "Rosedale_Ave",
  "Rte_129",
  "Rte_15",
  "Rte_35",
  "San_Andreas_Rd",
  "Saratoga_Toll_Rd",
  "Scott_Farm_Rd",
  "Seascape_Blvd",
  "Sells_Dr",
  "Sequoia_Ave",
  "Shiman_Ln",
  "Shoquelle_Way",
  "Skid_Rd",
  "Stardust_Ln",
  "Storm_Ln",
  "Summit_Rd",
  "Sundance_Hill",
  "Tall_Tree_Hill",
  "Tromba_Rd",
  "Tucker_Rd",
  "Upper_Zayante_Rd",
  "Via_Paloma_Dr",
  "Villa_Glen_Dr",
  "W_Zayante_Rd",
  "Wharf_Rd",
  "Whitehouse_Creek_Rd"],
  sender: ["10 Oaks Cir",
  "12 Oaks Ln",
  "12th St W",
  "14 Tee Dr",
  "15th St W",
  "2 Rivers Cove",
  "23rd St E",
  "3 Oaks Cir",
  "3 Rivers Dr",
  "32nd St E",
  "38 1/2 St E",
  "3rd St",
  "3rd St E",
  "4 Oaks Ln",
  "4 Points Dr",
  "5 Acre Wood St",
  "5th St E",
  "6 Gun Trail",
  "7th St E Eb",
  "9 Oaks Cove",
  "9th St",
  "9th St W",
  "A Ln",
  "Abbate Cir",
  "Abbey Dr",
  "Abbey Glen Ln",
  "Abbott Dr",
  "Abby Ann Ln",
  "Abelia Dr",
  "Aberdeen Cir",
  "Aberdeen Dr",
  "Abilene Cove",
  "Abilene Trail",
  "Abingdon Pl",
  "Above Stratford Pl",
  "Acacia Bud Dr",
  "Academy Dr",
  "Acadian Trail",
  "Accomac Dr",
  "Ace Pass",
  "Acorn Cove",
  "Acorn Grove Ct",
  "Acorn Oaks Dr",
  "Acton Dr",
  "Ada Cir",
  "Adair Dr",
  "Adak Cove",
  "Adalee Ave",
  "Adam L Chapa Sr St",
  "Adams Ave",
  "Addie Roy Rd",
  "Addison Ave",
  "Adel Cove",
  "Adelaide Dr",
  "Adelanto Ct",
  "Adelphi Cove",
  "Adelphi Ln",],
  recipent: ["Batman",
  "Superman ",
  "Joker",
  "Nightwing",
  "Viper",
  "Shakira",
  "Avery",
  "Aaron",
  "Jordan",
  "Gojo",
  "Sukuna",
  "Yuji",
  "Nanami",
  "Wolverine",
  "Spiderman",
  "Sauron ",
  "Gloria",
  "Alan",
  "Sherry",
  "Nathan",
  "Derrick",
  "Spencer",
  "Scott"],
  senderName: ["Jose",
  "Donald",
  "Christian",
  "Jackie",
  "Oscar",
  "Lily",
  "Olivia",
  "Sophia",
  "Michelle",
  "Tracy",
  "Charlott",
  "Sarah",
  "Abraham",
  "Bruce",
  "Liam",
  "Roy",
  "Martin",
  "Mia",
  "Jeffrey",
  "Steven"],
  conditionStatus: ["Fine", "Damaged", "Perfect", "Slightly-damaged"],
  item: ["Gun","Table","Laptop ","Pc ", "Mouse", "Mousepad", "GPU", "CPU", "Monitor", "Air Cooler", "PSU", "RAM",
  "Chair ",
  "Phone ",
  "Knife ",
  "Lamp ",
  "Plate ",
  "Board ",
  "Window_pane ",
  "Wood ",
  "Ball ",
  "Baseball ",
  "Bat ",
  "Eraser ",
  "Door ",
  "Outlet ",
  "Backpack ",
  "Bottle ",
  "Cap "],
  company: ['Ebay', 'Best Buy', 'NVIDIA', 'Logitech', 'Razer', 'SteelSeries', 'Target', 'Walmart', 'NewEgg', 'Amazon', 'Alibaba', 'Wish.com', 'Temu', 'Dicks Sporting Goods'],
  dollars: [100, 2, 3, 56, 48, 84, 10, 90, 9000, 400, 42, 30, 24, 10, 12, 14, 18, 76, 65, 23],
  currency: ["Dollar(s)", 
  "Yuan",
  "Pound(s)", 
  "Euro(s)",
  "GBP",
  "Canadian dollar(s)",
  "Peso(s)",
  "Yen", 
  "Won", 
  "Shilling(s)", 
  "Soul(s)",
  "Blood_echoes", 
  "Runes"],
  paymentMethod: ["Credit Card", "Venmo", 'Paypal', 'Physical', 'Apple pay'],
  notes: ['Ship 10 days later', 'Sip earlier than normal', 'Ship normally', 'Don\'t ship at all']
  };
  
  var x = "\n" 
  const template = `Order date: $month/$day/$year 
  --------------------------------------------------------------------------------------------------------------------- 
  From: $senderName 
  Sender address: $sendNumStreet $sender, Austin, Texas, $sendZipCode 
  To: $recipent 
  Recipent address: $recipNumStreet $streetName, Santa Cruz, CA, $recipZipCode 
  
  ----------------------------------------------Item Information------------------------------------------------
  Item: $item 
  Sold by: $company 
  Package condition: $conditionStatus
  
  ---------------------------------------------Payment Information--------------------------------------------
  Order total: $dollars $currency 
  Payment method: $paymentMethod
  Additional notes: $notes
  `;
  
  //top.hidden = true; 
  bottom.hidden = true; 
  $("#top").hide()
  clicker.hidden = true;
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  var numbers;
  
  function setFisher(){
    numbers = 1;
    fisher.hidden = true 
    clicker.hidden = true
    bottom.hidden = false 
    $("#top").show()
    default_opt.hidden = false 
  }
  
  function setDefault(){
    numbers = 0; 
    clicker.hidden = false
    default_opt.hidden = true
    $("#top").hide()
    bottom.hidden = true 
    fisher.hidden = false
  }
  
  //add an additional shuffle based on Fisher Yates Algorithm
  //sources: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle 
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
  //https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/ 
  function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--)
      {
       
          // Pick a random index from 0 to i inclusive
          let j = Math.floor(Math.random() * (i + 1)); 
   
          // Swap arr[i] with the element 
          // at random index 
          [arr[i], arr[j]] = [arr[j], arr[i]];
      } 
  }
  
  function replacer(match, name) {
    let options = fillers[name];
    console.log(numbers)
    if (options && numbers == 0) {
      return options[Math.floor(Math.random() * options.length)];
    } 
    if(options && numbers == 1) {
      shuffle(options);
      return options[1];
    }
    if(options && numbers == 2) {
      shuffle(options);
      return options[options.length - 1];
    }
    else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function clickTop(){
    numbers = 1
    generate() 
  }

  function clickBottom(){
    numbers = 2
    generate()
  }

  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
    /* global box */
    $("#box").text(story);
  }

  $("#fisher").click(setFisher);
  $("#default_opt").click(setDefault);
  $("#top").click(clickTop);
  $("#bottom").click(clickBottom); 
  $("#clicker").click(generate);

  //generate();
}

// let's get this party started - uncomment me
main();