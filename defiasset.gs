// Only for access to files in which the add-on or script is used, rather than all of a user's spreadsheets

/**
* @OnlyCurrentDoc
*/

/*====================================================================================================================================*
  CryptoTools Google Sheet Feed by Eloise1988
  ====================================================================================================================================
  Version:      1.0.0
  Project Page: https://github.com/Eloise1988/DEFIASSETS/
  Copyright:    (c) 2021 by Eloise1988
                
  License:     MIT License
               
  ------------------------------------------------------------------------------------------------------------------------------------
  A library for importing the list of all assets (tokens, pools, nft, claimable etc...) from smart chains:
  
  DEFI_NETWORTH               For use by end users to retrieve list of all assets from smart chains (ERC20, BEP20, MATIC etc..)
    
  For bug reports see https://github.com/Eloise1988/TEHGRAPH/issues
  ------------------------------------------------------------------------------------------------------------------------------------
  Changelog:
  
  1.0.0   Creation DEFI_NETWORTH function  
*====================================================================================================================================*/
//CRYPTOTOOLS PRIVATE KEY 
//For faster & greater access, please provide your private Key in the brackets
const cryptotools_api_key="";

/**DEFI_NETWORTH 
 * ScriptRunTime Function that gets DEFI NETWORTH based on list of addresses
**/
function DEFI_NETWORTH() {
  //Name of the tab where you want to have your data
  var name_sheet="DEFI_NETWORTH";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name_sheet);

  // Table start row and columns
  var start_row=25;
  var start_column=2;

  //Clearing old data
  sheet.getRange(start_row,start_column,3000,8).clearContent()
  
  //Loading List of DEFI addresses in cells C3:E3
  address_defi=sheet.getRange(3,3,1,3).getValues();
  var dict_address = []; 
    for (var i=0;i<address_defi[0].length;i++) {
      if (address_defi[0][i]!=""){
      dict_address.push(address_defi[0][i]);
      }
    }
  address_defi = [].concat(dict_address).join("%2C").replace("-", "").replace("/", ""); 
  
  //Loading List of optional protocols in cells C6:G6
  protocols_defi=sheet.getRange(6,3,1,5).getValues();
  Logger.log(protocols_defi)
  try{var dict_protocols= []; 
    for (var i=0;i<protocols_defi[0].length;i++) {
      if (protocols_defi[0][i]!=""){
      dict_protocols.push(protocols_defi[0][i].replace(" ", "6z6"));
      }
    }
  protocols_defi = [].concat(dict_protocols).join("%2C");}
  catch(err){
    protocols_defi="";
  } 
  if (protocols_defi==""){protocols_defi="notapplicable"}
  
  //Connection to the API endpoints I created
  var GSUUID = encodeURIComponent(Session.getTemporaryActiveUserKey());
  GSUUID= GSUUID.replace(/%2f/gi, 'hello');
  var userProperties = PropertiesService.getUserProperties();
  var KEYID = userProperties.getProperty("KEYID") || GSUUID;

  private_path="http://api.charmantadvisory.com";
  http_options ={'headers':{'apikey':KEYID}};
  
  if (cryptotools_api_key != "") {
    private_path="https://privateapi.charmantadvisory.com";
    http_options = {'headers':{'apikey':cryptotools_api_key}};
  }
  url="/DEFINETWORTH/"+address_defi +"/"+protocols_defi+"/"+KEYID;
  
  // Calling the API and retrieving the data
  Logger.log(private_path+url)
  var res = UrlFetchApp.fetch(private_path+url, http_options);
  var content = JSON.parse(res.getContentText());
  Logger.log(content)
  //Setting the values in the range defined at the beginning of the script
  sheet.getRange(start_row,start_column,content.length,content[0].length).setValues(content);
  
 
}
 /**PROTOCOLS
 * Returns the list of protocols available on the Zapper api,
 *
 * Available protocols can be found https://docs.zapper.fi/zapper-api/api-guides
 *
 * By default, data gets transformed into a list. 
 * For example:
 *
 * =PROTOCOLS()
 *
 * @return the list of protocols available on zapper.fi
 **/
function PROTOCOLS(){
  var protocol_List = ["ethereum abracadabra","ethereum alchemix","ethereum alpha-v2","ethereum apy","ethereum arcx","ethereum armor","ethereum badger","ethereum balancer-v1","ethereum balancer-v2","ethereum bancor","ethereum bao","ethereum barnbridge","ethereum barnbridge-smart-yield","ethereum based-money","ethereum basis-cash","ethereum basis-gold","ethereum basket-dao","ethereum bella","ethereum benchmark","ethereum big-data","ethereum boring-dao","ethereum b-protocol","ethereum compound","ethereum convex","ethereum cream","ethereum cream-iron-bank","ethereum cryptex","ethereum curve","ethereum defi-dollar","ethereum defisaver","ethereum defi-swap","ethereum derivadex","ethereum deversifi","ethereum dfi-money","ethereum dforce","ethereum dhedge","ethereum dodo","ethereum dodo","ethereum dopex","ethereum dsd","ethereum dydx","ethereum dydx","ethereum 88mph","ethereum 88mph-v3","ethereum element","ethereum esd","ethereum essentia","ethereum fei","ethereum float-protocol","ethereum frax","ethereum futureswap","ethereum governor-dao","ethereum gro","ethereum harvest","ethereum hegic","ethereum idle","ethereum illuvium","ethereum index-coop","ethereum indexed","ethereum inverse","ethereum inverse","ethereum keeper-dao","ethereum keep-network","ethereum klondike","ethereum klondike-v2","ethereum kyber-dmm","ethereum launchpool","ethereum linkswap","ethereum liquity","ethereum loopring","ethereum maker","ethereum mirror","ethereum mith-cash","ethereum mooniswap","ethereum mstable","ethereum mushroom","ethereum nsure-network","ethereum olympus","ethereum 1inch","ethereum onx","ethereum opium-network","ethereum opyn","ethereum orion-protocol","ethereum perpetual-protocol","ethereum pickle","ethereum pie-dao","ethereum pooltogether","ethereum popsicle","ethereum powerpool","ethereum rally","ethereum rari","ethereum rari-fuse","ethereum realt","ethereum reflexer","ethereum ren","ethereum ribbon","ethereum sablier","ethereum saddle","ethereum sfinance","ethereum shapeshift","ethereum shared-stake","ethereum shell","ethereum smoothy","ethereum snowswap","ethereum stake-dao","ethereum strudel","ethereum sushiswap","ethereum sushiswap-kashi","ethereum swerve","ethereum synlev","ethereum synthetix","ethereum the-graph","ethereum tokemak","ethereum tokenlon","ethereum tokensets","ethereum tornado-cash","ethereum uniswap","ethereum uniswap-v2","ethereum uniswap-v3","ethereum unit","ethereum value","ethereum vesper","ethereum xsigma","ethereum xtoken","ethereum yam","ethereum yaxis","ethereum yearn","ethereum zlot","ethereum epns","polygon aavegotchi","polygon aave-v2","polygon adamant","polygon apeswap","polygon augur","polygon balancer-v2","polygon barnbridge-smart-yield","polygon beefy","polygon cream","polygon curve","polygon dfyn","polygon dinoswap","polygon dodo","polygon dodo","polygon harvest","polygon iron","polygon kyber-dmm","polygon pickle","polygon polywhale","polygon pooltogether","polygon quickswap","polygon superfluid","polygon sushiswap","polygon sushiswap-bentobox","polygon sushiswap-kashi","polygon waultswap","avalanche aave-v2","avalanche abracadabra","avalanche beefy","avalanche benqi","avalanche curve","avalanche lydia","avalanche pangolin","avalanche penguin","avalanche snowball","avalanche stormswap","avalanche teddy-cash","avalanche traderjoe","avalanche wonderland","avalanche yieldyak","arbitrum abracadabra","arbitrum adamant","arbitrum badger","arbitrum balancer-v2","arbitrum beefy","arbitrum curve","arbitrum dforce","arbitrum dodo","arbitrum dodo","arbitrum pickle","arbitrum sushiswap","arbitrum sushiswap-bentobox","arbitrum sushiswap-kashi","arbitrum swapr","arbitrum uniswap-v3","arbitrum wepiggy","fantom abracadabra","fantom beefy","fantom cream","fantom curve","fantom reaper","fantom scream","fantom spiritswap","fantom spookyswap","fantom sushiswap","binance-smart-chain apeswap","binance-smart-chain autofarm","binance-smart-chain beefy","binance-smart-chain belt","binance-smart-chain bzx","binance-smart-chain cream","binance-smart-chain dodo","binance-smart-chain dodo","binance-smart-chain ellipsis","binance-smart-chain harvest","binance-smart-chain impossible-finance","binance-smart-chain 1inch","binance-smart-chain pancakeswap","binance-smart-chain popsicle","binance-smart-chain sushiswap","binance-smart-chain sushiswap-bentobox","binance-smart-chain sushiswap-kashi","binance-smart-chain venus","binance-smart-chain waultswap","optimism lyra","optimism synthetix","optimism uniswap-v3"];
  
  return protocol_List;
}
