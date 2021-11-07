// Only for access to files in which the add-on or script is used, rather than all of a user's spreadsheets

/**
* @OnlyCurrentDoc
*/

/*====================================================================================================================================*
  CryptoTools Google Sheet Feed by Eloise1988
  ====================================================================================================================================
  Version:      1.0.4
  Project Page: https://github.com/Eloise1988/DEFIASSETS/
  Copyright:    (c) 2021 by Eloise1988
                
  License:     MIT License
               
  ------------------------------------------------------------------------------------------------------------------------------------
  A library for importing the list of all assets (tokens, pools, nft, claimable etc...) from smart chains:
  
  DEFI_NETWORTH                 ScriptRunTime Function that gets DEFI NETWORTH based on list of addresses
  PROTOCOLS                     For use by end users to retrieve the list of protocols available on zapper.fi
  CRYPTODEFI                    For use by end users to retrieve the list of assets by defi protocol  
  CRYPTODEFI_BALANCE            For use by end users to retrieve the balance by symbol/ticker given a defi protocol 
  CRYPTODEFI_BALANCEUSD         For use by end users to retrieve the USD amont lended by symbol/ticker given a defi protocol
  
  For bug reports see https://github.com/Eloise1988/DEFIASSETS/issues
  ------------------------------------------------------------------------------------------------------------------------------------
  Changelog:
  
  1.0.0   Creation DEFI_NETWORTH ScriptRunTime Function that gets DEFI NETWORTH based on list of addresses
  1.0.1   PROTOCOLS returns the list of protocols available on the Zapper api
  1.0.2   CRYPTODEFI returns the list assets by defi protocol  
  1.0.3   CRYPTODEFI_BALANCE returns the balance by symbol/ticker given a defi protocol into Google spreadsheets.  
  1.0.4   CRYPTODEFI_BALANCEUSD returns the USD amont lended by symbol/ticker given a defi protocol into Google spreadsheets.   
*====================================================================================================================================*/
//CRYPTOTOOLS PRIVATE KEY 
//For faster & greater access, please provide your private Key in the brackets
const cryptotools_api_key="";

//CACHING TIME  
//Expiration time for caching values, by default caching data last 10min=600sec. This value is a const and can be changed to your needs.
const expirationInSeconds_=600;


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
  
  try{var dict_protocols= []; 
    for (var i=0;i<protocols_defi[0].length;i++) {
      if (protocols_defi[0][i]!=""){
      dict_protocols.push(protocols_defi[0][i].replace(" ", "6z6").toLowerCase());
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
  
  var res = UrlFetchApp.fetch(private_path+url, http_options);
  var content = JSON.parse(res.getContentText());
  
  //Setting the values in the range defined at the beginning of the script
  sheet.getRange(start_row,start_column,content.length,content[0].length).setValues(content);
  
 
}
/**CRYPTODEFI 
 * Returns the list assets lended, staked... by defi protocol into Google spreadsheets. 
 * By default, data gets transformed into a array/number. 
 * For example:
 *
 *   =CRYPTODEFI("0x98d946dc96e49a5bf9fdfb6bafbbfd02f746f18c","binance-smart-chain autofarm")           
 * 
 * @param {address}                        Ethereum/bsc/polygon/fantom smart chain address
 * @param {protocol}                       from the list of protocols available in the protocol function
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a dimensional array containing the list of assets staked, lended with price, value, balance etc...
 **/
async function CRYPTODEFI(address, protocols) {
  try{
  address_defi = [].concat(address).join("%2C").replace("-", "").replace("/", ""); 
  protocols_defi = [].concat(protocols.toLowerCase().replace(" ", "6z6")).join("%2C");
  
  id_cache=Utilities.base64Encode( Utilities.computeDigest(Utilities.DigestAlgorithm.MD5,address_defi+protocols_defi+'cryptodefi'));
  
  var cache = CacheService.getScriptCache();
  var cached = cache.get(id_cache);
  if (cached != null) {
    result=JSON.parse(cached);
    return result; 
  }

  
  //Connection to the API endpoints 
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
  url="/DEFIFORMULA/"+address_defi +"/"+protocols_defi+"/"+KEYID;
  
  
   var res = await UrlFetchApp.fetch(private_path+url, http_options);
   var content = res.getContentText();
   var parsedJSON = JSON.parse(content);
   
   var data=[]
   data.push(["NETWORK","PROTOCOL","ADDRESS","TYPE","SYMBOL","BALANCE","PRICE","BALANCE_USD"])
  
  for (var i=0;i<parsedJSON.length;i++) {
        data.push([parsedJSON[i]["NETWORK"],parsedJSON[i]["PROTOCOL"],parsedJSON[i]["ADDRESS"],parsedJSON[i]["TYPE"],parsedJSON[i]["SYMBOL"],parsedJSON[i]["BALANCE"],parsedJSON[i]["PRICE"],parsedJSON[i]["BALANCE_USD"]]);
        };
  try{cache.put(id_cache,JSON.stringify(data),expirationInSeconds_);
  return data; } 
  catch(err){ 
    return data;
  }   
  }

  catch(err){
    return err;
  }
}
/**CRYPTODEFI_BALANCE
 * Returns the staked/lended balance by symbol/ticker given a defi protocol into Google spreadsheets. 
 * By default, data gets transformed into a array/number. 
 * For example:
 *
 *   =CRYPTODEFI_BALANCE("0x98d946dc96e49a5bf9fdfb6bafbbfd02f746f18c","CAKE","binance-smart-chain autofarm")           
 * 
 * @param {address}                        Ethereum/bsc/polygon/fantom smart chain address
 * @param {ticker}                         Ticker/Symbol
 * @param {protocol}                       from the list of protocols available in the protocol function
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a dimensional array containing the balance amount staked, lend etc...
 **/
async function CRYPTODEFI_BALANCE(address,ticker, protocols) {
  try{
  address_defi = [].concat(address).join("%2C").replace("-", "").replace("/", ""); 
  protocols_defi = [].concat(protocols.toLowerCase().replace(" ", "6z6")).join("%2C");
  ticker= ticker.toUpperCase();
  
  //Cache
  id_cache=Utilities.base64Encode( Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, address_defi+ticker+protocols_defi+"CRYPTODEFIASSET"));
  var cache = CacheService.getScriptCache();
  var cached = cache.get(id_cache);
  if (cached != null) {
    result=cached.split(',');
    return result.map(function(n) { return n && ("" || Number(n))}); 
    }    

  //Connection to the API endpoints 
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
  url="/DEFIFORMULA/"+address_defi +"/"+protocols_defi+"/"+KEYID;
  
  // Calling the API and retrieving the data
  var res = UrlFetchApp.fetch(private_path+url, http_options);
  var content = JSON.parse(res.getContentText());
  
  var dict = []; 
  for (var i=0;i<content.length;i++) {
    if (content[i]['SYMBOL'].toUpperCase()== ticker){
    dict.push(parseFloat(content[i]['BALANCE']));
    }
  }
  cache.put(id_cache,dict,expirationInSeconds_);
  return dict;}
  
  catch(err){
    return err;
  }
}
/**CRYPTODEFI_BALANCEUSD
 * Returns the staked/lended USD value by symbol/ticker given a defi protocol into Google spreadsheets. 
 * By default, data gets transformed into a array/number. 
 * For example:
 *
 *   =CRYPTODEFI_BALANCEUSD("0x98d946dc96e49a5bf9fdfb6bafbbfd02f746f18c","CAKE","binance-smart-chain autofarm")           
 * 
 * @param {address}                        Ethereum/bsc/polygon/fantom smart chain address
 * @param {ticker}                         Ticker/Symbol
 * @param {protocol}                       from the list of protocols available in the protocol function
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a dimensional array containing the USD amount staked, lend etc...
 **/
async function CRYPTODEFI_BALANCEUSD(address,ticker, protocols) {
  try{
  address_defi = [].concat(address).join("%2C").replace("-", "").replace("/", ""); 
  protocols_defi = [].concat(protocols.replace(" ", "6z6").toLowerCase()).join("%2C");
  ticker= ticker.toUpperCase();
  
  //Cache
  id_cache=Utilities.base64Encode( Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, address_defi+ticker+protocols_defi+"CRYPTODEFIVALUE"));
  var cache = CacheService.getScriptCache();
  var cached = cache.get(id_cache);
  if (cached != null) {
    result=cached.split(',');
    return result.map(function(n) { return n && ("" || Number(n))}); 
    }    

  //Connection to the API endpoints 
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
  url="/DEFIFORMULA/"+address_defi +"/"+protocols_defi+"/"+KEYID;
  
  // Calling the API and retrieving the data
  var res = UrlFetchApp.fetch(private_path+url, http_options);
  var content = JSON.parse(res.getContentText());
  
  var dict = []; 
  for (var i=0;i<content.length;i++) {
    if (content[i]['SYMBOL'].toUpperCase()== ticker){
    dict.push(parseFloat(content[i]['BALANCE_USD']));
    }
  }
  cache.put(id_cache,dict,expirationInSeconds_);
  return dict;}
  
  catch(err){
    return err;
  }
}

/**PROTOCOLS
 * Returns the list of protocols available on the Zapper api. 
 * By default, data gets transformed into a array. 
 * For example:
 *
 *   =PROTOCOLS()           
 * 
 * @param {parseOptions}                   an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a dimensional array containing the list of all available protocols
 **/
async function PROTOCOLS(){
  var protocol_List = ["ethereum abracadabra","ethereum alchemix","ethereum alpha-v2","ethereum apy","ethereum arcx","ethereum armor","ethereum badger","ethereum balancer-v1","ethereum balancer-v2","ethereum bancor","ethereum bao","ethereum barnbridge","ethereum barnbridge-smart-yield","ethereum based-money","ethereum basis-cash","ethereum basis-gold","ethereum basket-dao","ethereum bella","ethereum benchmark","ethereum big-data","ethereum boring-dao","ethereum b-protocol","ethereum compound","ethereum convex","ethereum cream","ethereum cream-iron-bank","ethereum cryptex","ethereum curve","ethereum defi-dollar","ethereum defisaver","ethereum defi-swap","ethereum derivadex","ethereum deversifi","ethereum dfi-money","ethereum dforce","ethereum dhedge","ethereum dodo","ethereum dodo","ethereum dopex","ethereum dsd","ethereum dydx","ethereum dydx","ethereum 88mph","ethereum 88mph-v3","ethereum element","ethereum esd","ethereum essentia","ethereum fei","ethereum float-protocol","ethereum frax","ethereum futureswap","ethereum governor-dao","ethereum gro","ethereum harvest","ethereum hegic","ethereum idle","ethereum illuvium","ethereum index-coop","ethereum indexed","ethereum inverse","ethereum inverse","ethereum keeper-dao","ethereum keep-network","ethereum klondike","ethereum klondike-v2","ethereum kyber-dmm","ethereum launchpool","ethereum linkswap","ethereum liquity","ethereum loopring","ethereum maker","ethereum mirror","ethereum mith-cash","ethereum mooniswap","ethereum mstable","ethereum mushroom","ethereum nsure-network","ethereum olympus","ethereum 1inch","ethereum onx","ethereum opium-network","ethereum opyn","ethereum orion-protocol","ethereum perpetual-protocol","ethereum pickle","ethereum pie-dao","ethereum pooltogether","ethereum popsicle","ethereum powerpool","ethereum rally","ethereum rari","ethereum rari-fuse","ethereum realt","ethereum reflexer","ethereum ren","ethereum ribbon","ethereum sablier","ethereum saddle","ethereum sfinance","ethereum shapeshift","ethereum shared-stake","ethereum shell","ethereum smoothy","ethereum snowswap","ethereum stake-dao","ethereum strudel","ethereum sushiswap","ethereum sushiswap-kashi","ethereum swerve","ethereum synlev","ethereum synthetix","ethereum the-graph","ethereum tokemak","ethereum tokenlon","ethereum tokensets","ethereum tornado-cash","ethereum uniswap","ethereum uniswap-v2","ethereum uniswap-v3","ethereum unit","ethereum value","ethereum vesper","ethereum xsigma","ethereum xtoken","ethereum yam","ethereum yaxis","ethereum yearn","ethereum zlot","ethereum epns","polygon aavegotchi","polygon aave-v2","polygon adamant","polygon apeswap","polygon augur","polygon balancer-v2","polygon barnbridge-smart-yield","polygon beefy","polygon cream","polygon curve","polygon dfyn","polygon dinoswap","polygon dodo","polygon dodo","polygon eleven-finance","polygon harvest","polygon iron","polygon kyber-dmm","polygon pickle","polygon polywhale","polygon pooltogether","polygon quickswap","polygon superfluid","polygon sushiswap","polygon sushiswap-bentobox","polygon sushiswap-kashi","polygon waultswap","avalanche aave-v2","avalanche abracadabra","avalanche beefy","avalanche benqi","avalanche curve","avalanche lydia","avalanche pangolin","avalanche penguin","avalanche snowball","avalanche stormswap","avalanche teddy-cash","avalanche traderjoe","avalanche wonderland","avalanche yieldyak","arbitrum abracadabra","arbitrum adamant","arbitrum badger","arbitrum balancer-v2","arbitrum beefy","arbitrum curve","arbitrum dforce","arbitrum dodo","arbitrum dodo","arbitrum pickle","arbitrum sushiswap","arbitrum sushiswap-bentobox","arbitrum sushiswap-kashi","arbitrum swapr","arbitrum uniswap-v3","arbitrum wepiggy","fantom abracadabra","fantom beefy","fantom cream","fantom curve","fantom reaper","fantom scream","fantom spiritswap","fantom spookyswap","fantom sushiswap","binance-smart-chain apeswap","binance-smart-chain autofarm","binance-smart-chain beefy","binance-smart-chain belt","binance-smart-chain bzx","binance-smart-chain cream","binance-smart-chain dodo","binance-smart-chain eleven-finance","binance-smart-chain ellipsis","binance-smart-chain harvest","binance-smart-chain impossible-finance","binance-smart-chain 1inch","binance-smart-chain pancakeswap","binance-smart-chain popsicle","binance-smart-chain sushiswap","binance-smart-chain sushiswap-bentobox","binance-smart-chain sushiswap-kashi","binance-smart-chain venus","binance-smart-chain waultswap","optimism lyra","optimism synthetix","optimism uniswap-v3"];
  
  return protocol_List;
}
