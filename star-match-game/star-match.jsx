/*
  Write JavaScript/React code here and press Ctrl+Enter to execute.

  Try: mountNode.innerHTML = 'Hello World!';
   Or: ReactDOM.render(<h2>Hello React!</h2>, mountNode);
*/
const PlayNumber = (props) => {
  return <button key={props.index}
                 style={{backgroundColor: colors[props.status]}}
                 className="number"
                 onClick={() => props.onClick(props.index, props.status)}>
                 {props.index}
         </button>
}

const Star = (props) => {
  return <div key={props.index} className="star" />
}

const PlayAgain = props => {
  return <div>
          <button onClick={props.onClick}>Play Again</button>
        </div>
}

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1,9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameOver = availableNums.length == 0;
  
  const colorIndex = (number) => {
      if (!availableNums.includes(number)) {
        return 'used';
      }
      if (candidateNums.includes(number)) {
        return candidatesAreWrong ? 'wrong' : 'candidate';
      }
      return 'available';
  } 
  
  const onButtonClick = (number, currentStatus) => {
        if (currentStatus === 'used')
          return;
        
        const newCandidateNums = 
          currentStatus === 'available' ?
              candidateNums.concat(number) :
              candidateNums.filter(cn => cn !== number);
        
        if (utils.sum(newCandidateNums) !== stars) {
          setCandidateNums(newCandidateNums);
        } else {
          const newAvailableNums = availableNums.filter(num =>                                     !newCandidateNums.includes(num));
          setStars(utils.randomSumIn(newAvailableNums, 9));
          setAvailableNums(newAvailableNums);
          setCandidateNums([]);
        }
  }
  
  const onPlayAgainClick = () => {
      setAvailableNums(utils.range(1, 9));
      setCandidateNums([]);
      setStars(utils.random(1,9));
  }
  
  return (
    <div class="game">
      <div className="header">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameOver ? <PlayAgain onClick={onPlayAgainClick}/> : 
          utils.range(1, stars).map(idx =>
                <Star index={idx} />)}
        </div>
        <div className="right">
          {utils.range(1, 9).map(idx =>
            <PlayNumber index={idx} status={colorIndex(idx)}
              onClick={onButtonClick}/>)}
        </div>
      </div>
    </div>
  );
}

const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue'
}

const utils = {
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
    //random: (max) => 1 + Math.floor(Math.random() * max),
    //range: (min, max) => Array(max - min + 1).fill().map((_, idx) => min + idx),
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
}

ReactDOM.render(<StarMatch />, mountNode);
