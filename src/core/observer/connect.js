import Observer from "./index.js";

// NOTE: Decorator
const connectToObserver = (Component) =>
  class extends Component {
    static name = `connected to observer ${Component.name}`;

    constructor(...props) {
      props.push(Observer.instance);

      super(...props);
    }
  };

export default connectToObserver;
