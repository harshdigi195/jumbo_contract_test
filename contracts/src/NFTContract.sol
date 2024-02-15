// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PatentNFT 
 * @author Dhanraj Dadhich
 * @dev Extends ERC721 Non-Fungible Token Standard basic implementation with patent functionality
 */
contract NFTContract is ERC721Enumerable, ReentrancyGuard, Ownable(msg.sender) {
    string public ticker;
    uint256 public maxSupply;
    mapping(uint256 => uint256) private patentIds;

    event PatentMinted(address indexed to, uint256 indexed tokenId, uint256 patentId);

    // constructor(string memory name, string memory ticker, uint256 maxSupply) ERC721(name, _ticker) {
        constructor(string memory name, string memory ticker, uint256 maxSupply) ERC721(name, ticker){
        require(maxSupply > 0, "Max supply must be greater than 0");
        // ticker = _ticker;
        // maxSupply = _maxSupply;
    }

    /**
     * @dev Mints a new patent NFT
     * @param to the address that will own the minted NFT
     * @param patentId unique identifier for a patent
     */
    function mint(address to, uint256 patentId) public nonReentrant onlyOwner {
        require(totalSupply() < maxSupply, "Max supply reached");
        require(patentId > 0, "Patent ID is required");

        uint256 newTokenId = totalSupply() + 1;
        _safeMint(to, newTokenId);
        patentIds[newTokenId] = patentId;

        emit PatentMinted(to, newTokenId, patentId);
    }

    /**
     * @dev Returns the patent ID of the specified token
     * @param tokenId unique token identifier
     */
    // function getPatentId(uint256 tokenId) public view returns (uint256) {
    //     require(_exists(tokenId), "Token does not exist");
    //     return patentIds[tokenId];
    // }
    function getPatentId(uint256 tokenId) public view returns (uint256) {
        // require(_exists(tokenId), "Token does not exist");
        require(tokenId != 0, "Invalid Token ot Token does not exist" );
        return patentIds[tokenId];
    }

    /**
     * @dev Sets a new cap for the max number of NFTs
     * @param _newMaxSupply new maximum number of NFTs
     */
    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
        require(_newMaxSupply >= totalSupply(), "New max must be greater than current supply");
        maxSupply = _newMaxSupply;
    }

}
