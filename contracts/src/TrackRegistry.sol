// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ArtistRegistry.sol";

/**
 * @title TrackRegistry
 * @notice On-chain track metadata and ownership
 * @dev Links to off-chain audio via IPFS/storage URI
 */
contract TrackRegistry {
    
    struct Track {
        uint256 id;
        address artist;
        string title;
        string description;
        string audioURI;      // IPFS or storage
        string coverArtURI;   // IPFS or storage
        uint256 duration;     // seconds
        string genre;
        uint256 uploadedAt;
        bool isActive;
        
        // Royalty splits (basis points, 10000 = 100%)
        uint16 artistShare;    // default 7000 (70%)
        uint16 platformShare;  // default 2000 (20%)
        uint16 listenerShare;  // default 1000 (10%)
    }
    
    Track[] public tracks;
    ArtistRegistry public artistRegistry;
    
    // artist => track IDs
    mapping(address => uint256[]) public artistTracks;
    
    address public owner;
    address public platformWallet;
    
    uint256 public constant TOTAL_SHARES = 10000;
    
    event TrackUploaded(
        uint256 indexed trackId,
        address indexed artist,
        string title,
        uint256 timestamp
    );
    
    event TrackUpdated(
        uint256 indexed trackId,
        string title,
        uint256 timestamp
    );
    
    modifier onlyRegisteredArtist() {
        require(artistRegistry.isArtist(msg.sender), "Must be registered artist");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor(address _artistRegistry, address _platformWallet) {
        owner = msg.sender;
        artistRegistry = ArtistRegistry(_artistRegistry);
        platformWallet = _platformWallet;
    }
    
    /**
     * @notice Upload a new track to Resonance
     */
    function uploadTrack(
        string calldata _title,
        string calldata _description,
        string calldata _audioURI,
        string calldata _coverArtURI,
        uint256 _duration,
        string calldata _genre,
        uint16 _artistShare,
        uint16 _platformShare,
        uint16 _listenerShare
    ) external onlyRegisteredArtist returns (uint256) {
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_audioURI).length > 0, "Audio URI required");
        require(_artistShare + _platformShare + _listenerShare == TOTAL_SHARES, "Shares must equal 100%");
        
        uint256 trackId = tracks.length;
        
        tracks.push(Track({
            id: trackId,
            artist: msg.sender,
            title: _title,
            description: _description,
            audioURI: _audioURI,
            coverArtURI: _coverArtURI,
            duration: _duration,
            genre: _genre,
            uploadedAt: block.timestamp,
            isActive: true,
            artistShare: _artistShare,
            platformShare: _platformShare,
            listenerShare: _listenerShare
        }));
        
        artistTracks[msg.sender].push(trackId);
        
        emit TrackUploaded(trackId, msg.sender, _title, block.timestamp);
        
        return trackId;
    }
    
    /**
     * @notice Get track by ID
     */
    function getTrack(uint256 _trackId) external view returns (Track memory) {
        require(_trackId < tracks.length, "Track not found");
        return tracks[_trackId];
    }
    
    /**
     * @notice Get all tracks by an artist
     */
    function getArtistTracks(address _artist) external view returns (uint256[] memory) {
        return artistTracks[_artist];
    }
    
    /**
     * @notice Get total track count
     */
    function getTrackCount() external view returns (uint256) {
        return tracks.length;
    }
    
    /**
     * @notice Deactivate a track (artist or owner)
     */
    function deactivateTrack(uint256 _trackId) external {
        require(_trackId < tracks.length, "Track not found");
        require(
            tracks[_trackId].artist == msg.sender || msg.sender == owner,
            "Not authorized"
        );
        
        tracks[_trackId].isActive = false;
    }
}