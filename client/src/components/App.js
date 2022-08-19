import { useState, useEffect } from "react";

const App = () => {
  const [test, setTest] = useState(null);

  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setTest(data));
  }, []);

  return <div>{test ? test : `TEST DOESNT WORK!`}</div>;
};

export default App;
