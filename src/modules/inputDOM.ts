export default class inputDOM {
  TOPIC: string;
  input: HTMLInputElement;
  btn: HTMLButtonElement;
  constructor() {
    this.TOPIC = "get-input";
    this.input = document.querySelector(`input[type=text]`) as HTMLInputElement;
    this.btn = document.querySelector("#submission") as HTMLButtonElement;
  }

  linkEvent(): void {
    this.btn.addEventListener("click", this._sendInputData.bind(this));
  }

  private _sendInputData(e: Event): void {
    e.preventDefault();
    const inputDetails = this._getInputData();
    this._resetInput();

    PubSub.publish(this.TOPIC, inputDetails);
  }

  private _getInputData(): string {
    return this.input.value;
  }

  private _resetInput(): void {
    this.input.value = "";
  }
}
