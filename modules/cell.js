export default function Cell() {
    let value = "";
  
    const addMark = (player) => {
      value = player;
    };
  
    const getValue = () => value;
  
    return { addMark, getValue };
  }