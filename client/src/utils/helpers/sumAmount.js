export default (array = []) => array.reduce((sum, i) => (sum += i.count), 0);
