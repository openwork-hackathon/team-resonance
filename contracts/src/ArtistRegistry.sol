// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ArtistRegistry
 * @notice Wallet-verified artist identity for Resonance platform
 * @dev No KYC, no gatekeepers - just cryptographic proof
 */
contract ArtistRegistry {
    
    struct Artist {
        address wallet;
        string name;
        string bio;
        string avatarURI;
        uint256 registeredAt;
        bool verified;
    }
    
    // wallet address => Artist
    mapping(address => Artist) public artists;
    
    // name => wallet (for uniqueness checks)
    mapping(string => address) public nameToWallet;
    
    address public owner;
    
    event ArtistRegistered(
        address indexed wallet,
        string name,
        uint256 timestamp
    );
    
    event ArtistUpdated(
        address indexed wallet,
        string name,
        uint256 timestamp
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @notice Register as an artist on Resonance
     * @param _name Artist display name
     * @param _bio Artist biography
     * @param _avatarURI IPFS or storage URI for avatar
     */
    function registerArtist(
        string calldata _name,
        string calldata _bio,
        string calldata _avatarURI
    ) external {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_name).length <= 32, "Name too long");
        require(artists[msg.sender].registeredAt == 0, "Already registered");
        require(nameToWallet[_name] == address(0), "Name taken");
        
        artists[msg.sender] = Artist({
            wallet: msg.sender,
            name: _name,
            bio: _bio,
            avatarURI: _avatarURI,
            registeredAt: block.timestamp,
            verified: false
        });
        
        nameToWallet[_name] = msg.sender;
        
        emit ArtistRegistered(msg.sender, _name, block.timestamp);
    }
    
    /**
     * @notice Update artist profile
     */
    function updateProfile(
        string calldata _bio,
        string calldata _avatarURI
    ) external {
        require(artists[msg.sender].registeredAt > 0, "Not registered");
        
        artists[msg.sender].bio = _bio;
        artists[msg.sender].avatarURI = _avatarURI;
        
        emit ArtistUpdated(
            msg.sender,
            artists[msg.sender].name,
            block.timestamp
        );
    }
    
    /**
     * @notice Check if wallet is registered artist
     */
    function isArtist(address _wallet) external view returns (bool) {
        return artists[_wallet].registeredAt > 0;
    }
    
    /**
     * @notice Get artist by wallet
     */
    function getArtist(address _wallet) external view returns (Artist memory) {
        return artists[_wallet];
    }
    
    /**
     * @notice Get artist by name
     */
    function getArtistByName(string calldata _name) external view returns (Artist memory) {
        address wallet = nameToWallet[_name];
        require(wallet != address(0), "Artist not found");
        return artists[wallet];
    }
}