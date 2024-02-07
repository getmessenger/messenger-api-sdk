import { Base } from "./base";
import { Auth } from "./auth";
import { applyMixins } from "./utils";

class Typicode extends Base {}
interface Typicode extends Auth {}

applyMixins(Typicode, [Auth]);

export default Typicode;
