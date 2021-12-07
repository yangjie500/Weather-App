export default class switchDOM {
  public switchBtn: HTMLButtonElement;
  public hourlyDOM: HTMLDivElement;
  public dailyDOM: HTMLDivElement;

  constructor() {
    this.switchBtn = document.querySelector(".large-screen-btn") as HTMLButtonElement;
    this.hourlyDOM = document.querySelector(".hourly-forecast") as HTMLDivElement;
    this.dailyDOM = document.querySelector(".daily-forecast") as HTMLDivElement;
  }

  linkEvent(): void {
    this.switchBtn.addEventListener("click", this.switch.bind(this));
  }

  switch(): void {
    this._changeText();
    this._changeDisplay();
  }

  private _changeText(): void {
    if (this.switchBtn.textContent === "Daily") {
      this.switchBtn.textContent = "Hourly";
    } else {
      this.switchBtn.textContent = "Daily";
    }
  }

  private _changeDisplay(): void {
    this.hourlyDOM.classList.toggle("activated");
    this.dailyDOM.classList.toggle("activated");
  }
}
