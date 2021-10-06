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
  var protocol_List = ["ethereum aave-amm","ethereum aave-amm", "ethereum aave", "ethereum aave-v2", "ethereum abracadabra", "ethereum alchemix", "ethereum alpha-v1", "ethereum alpha-v2", "ethereum badger", "ethereum balancer-v1", "ethereum balancer-v2", "ethereum bancor", "ethereum barnbridge", "ethereum bella", "ethereum bitcoin", "ethereum b-protocol", "ethereum compound", "ethereum convex", "ethereum cover", "ethereum cream", "ethereum cream-iron-bank", "ethereum curve", "ethereum defisaver", "ethereum defi-swap", "ethereum derivadex", "ethereum deversifi", "ethereum dforce", "ethereum dhedge", "ethereum dodo", "ethereum dsd", "ethereum dydx", "ethereum 88mph", "ethereum element", "ethereum epns", "ethereum futureswap", "ethereum harvest", "ethereum hegic", "ethereum idle", "ethereum inverse", "ethereum keeper-dao", "ethereum kyber-dmm", "ethereum linkswap", "ethereum liquity", "ethereum loopring", "ethereum maker", "ethereum mooniswap", "ethereum mushroom", "ethereum nft", "ethereum 1inch", "ethereum opyn", "ethereum other", "ethereum pickle", "ethereum pooltogether", "ethereum popsicle", "ethereum rari", "ethereum rari-fuse", "ethereum realt", "ethereum reflexer", "ethereum ribbon", "ethereum sablier", "ethereum saddle", "ethereum sfinance", "ethereum shell", "ethereum smoothy", "ethereum snowswap", "ethereum sushiswap", "ethereum sushiswap-bentobox", "ethereum sushiswap-kashi", "ethereum swerve", "ethereum synthetix", "ethereum the-graph", "ethereum tokens", "ethereum tokensets", "ethereum uniswap", "ethereum uniswap-v2", "ethereum uniswap-v3", "ethereum unit", "ethereum value", "ethereum vesper", "ethereum xsigma", "ethereum yaxis", "ethereum yearn", "polygon aavegotchi", "polygon aave-v2", "polygon adamant", "polygon augur", "polygon balancer-v2", "polygon beefy", "polygon curve", "polygon dfyn", "polygon kyber-dmm", "polygon pickle", "polygon pooltogether", "polygon quickswap", "polygon superfluid", "polygon sushiswap", "polygon sushiswap-bentobox", "polygon sushiswap-kashi", "polygon tokens", "polygon waultswap", "fantom abracadabra", "fantom spookyswap", "fantom tokens", "binance-smart-chain autofarm", "binance-smart-chain beefy", "binance-smart-chain belt", "binance-smart-chain bzx", "binance-smart-chain ellipsis", "binance-smart-chain harvest", "binance-smart-chain 1inch", "binance-smart-chain pancakeswap", "binance-smart-chain tokens", "binance-smart-chain venus", "binance-smart-chain waultswap", "optimism synthetix", "optimism tokens", "optimism uniswap-v3"];
  
  return protocol_List;
}
