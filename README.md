# DEFIASSETS
Google Script that returns list of all assets (tokens, pools, nft, claimable etc...)

### DIY:
- 1) Add up to 3 ERC, BEP20, MATIC addresses
- 2) Add specific protocols if needed
- 3) Press on Refresh

### [GOOGLE SHEET EXAMPLE:](https://docs.google.com/spreadsheets/d/1eGiYXHjcB1XwIj2nQMLtvZ_h822ACOm2BCIuaVHEFQ4/edit?usp=sharing)
##
![DEFI](https://github.com/Eloise1988/DEFIASSETS/blob/main/GIF/DEFI_NETWORTH.gif)


### GET LIST OF ASSETS BY PROTOCOL:
=CRYPTODEFI("Holder Address","Protocol")
##
![CRYPTODEFI](https://github.com/Eloise1988/DEFIASSETS/blob/main/GIF/CRYPTODEFI.gif)

### GET ASSET QTY BY PROTOCOL & SYMBOL:
=CRYPTODEFIASSET("Holder Address","Symbol","Protocol")
##
![CRYPTODEFIASSET](https://github.com/Eloise1988/DEFIASSETS/blob/main/GIF/CRYPTODEFIASSET.gif)

### GET $ VALUE BY PROTOCOL & SYMBOL:
=CRYPTODEFIVAUE("Holder Address","Symbol","Protocol")
##
![CRYPTODEFIVALUE](https://github.com/Eloise1988/DEFIASSETS/blob/main/GIF/CRYPTODEFIVALUE.gif)

### GET LIST OF PROTOCOLS:
=PROTOCOLS()
##
![PROTOCOLS](https://github.com/Eloise1988/DEFIASSETS/blob/main/GIF/protocols.gif)
