# DEFIASSETS
Google Script that returns list of all assets (tokens, pools, nft, claimable etc...)

######
## PUBLICATION LINKS
###### [Link to the Medium Publication](https://medium.com/coinmonks/defi-crypto-portfolio-in-google-sheets-vaults-nfts-tokens-interest-647ebac65739)


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
=CRYPTODEFI_BALANCE("Holder Address","Symbol","Protocol")
##
![CRYPTODEFI_BALANCE](https://github.com/Eloise1988/DEFIASSETS/blob/main/GIF/CRYPTODEFI_BALANCE.gif)

### GET $ VALUE BY PROTOCOL & SYMBOL:
=CRYPTODEFI_BALANCEUSD("Holder Address","Symbol","Protocol")
##
![CRYPTODEFI_BALANCEUSD](https://github.com/Eloise1988/DEFIASSETS/blob/main/GIF/CRYPTODEFI_BALANCEUSD.gif)

### GET LIST OF PROTOCOLS:
=PROTOCOLS()
##
![PROTOCOLS](https://github.com/Eloise1988/DEFIASSETS/blob/main/GIF/protocols.gif)
