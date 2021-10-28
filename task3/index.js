function ipsBetween(ip1, ip2) {

    const firstIP = ip1.split('.').reduce((acc, cur, index) => {
        acc += Number(cur) * (256**(3 - index));
        return acc;
    }, 0);

    const secondIP = ip2.split('.').reduce((acc, cur, index) => {
        acc += Number(cur) * (256**(3 - index));
        return acc;
    }, 0);


    return secondIP - firstIP;
}

console.log(ipsBetween("10.0.0.0", "10.0.0.50"));
console.log(ipsBetween("10.0.0.0", "10.0.1.0"));
console.log(ipsBetween("20.0.0.10", "20.0.1.0"));

