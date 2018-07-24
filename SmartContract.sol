pragma solidity 0.4.24;

contract vikas {
    uint x;

    function set(uint a) public {
        x =a;
    }
    function get () public view returns ( uint) {
        return x;
    }
    
}
