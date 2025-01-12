// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCertificates is ERC721 {
    uint256 public certificateCounter;

    struct Certificate {
        uint256 id;
        uint256 projectId;
        address recipient;
        string metadataURI;
    }

    mapping(uint256 => Certificate) public certificates;

    event CertificateIssued(uint256 certificateId, address recipient, uint256 projectId);

    constructor() ERC721("XionCertificate", "XCERT") {}

    function issueCertificate(address _recipient, uint256 _projectId, string memory _metadataURI) external {
        certificateCounter++;
        _mint(_recipient, certificateCounter);

        certificates[certificateCounter] = Certificate({
            id: certificateCounter,
            projectId: _projectId,
            recipient: _recipient,
            metadataURI: _metadataURI
        });

        emit CertificateIssued(certificateCounter, _recipient, _projectId);
    }
}
