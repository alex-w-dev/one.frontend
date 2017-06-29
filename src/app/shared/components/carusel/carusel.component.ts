import { AfterViewInit, Component, Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

interface ISliderListItem {
  img: string;
  href: string;
  text: string;
}

interface ISliderPosition {
  minLeft: number;
  left: number;
}

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss']
})
export class CaruselComponent implements OnInit, AfterViewInit, OnDestroy {

  $slider: JQuery;
  $sliderList: JQuery;
  $sliderListContainer: JQuery;
  $toggleButton: JQuery;

  sliderHeight: number;
  slideStep: number;
  renewSliderHeightInterval;

  isSliderActive: boolean;

  slides: ISliderListItem[];

  constructor(private elementRef: ElementRef) {
    this.isSliderActive = true;
    this.slideStep = 500;
    this.slides = [];
    for (let i = 0; i < 15; i++) {
      this.slides.push({
        img: '/public/img/dop-issled.png',
        text: 'ЭКГ спинного мозга ' + i,
        href: '#',
      });
    }

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    clearInterval(this.renewSliderHeightInterval);
  }

  ngAfterViewInit(): void {
    this.$slider = $(this.elementRef.nativeElement).find('.slider-carusel');
    this.$toggleButton = this.$slider.find('.bio-slick-list-button');
    this.$toggleButton.attr('data-old-text', this.$toggleButton.text());
    this.$sliderList = this.$slider.find('.bio-slick-list');
    this.$sliderListContainer = this.$slider.find('.bio-slick-list__container');

    this.renewSliderHeight();

  }

  renewSliderHeight() {
    this.$sliderListContainer.height(this.$sliderList.height());
  }

  sliderToggle() {
    if (this.isSliderActive) {
      this.setPositionLeft(0);
      this.$toggleButton.attr('data-old-text', this.$toggleButton.text());
      this.$toggleButton.text('Скрыть');
      this.isSliderActive = false;
    } else {
      this.$toggleButton.text((this.$toggleButton.attr('data-old-text') || 'Смотреть все'));
      this.isSliderActive = true;
    }
  }

  getPositions(): ISliderPosition {
    let minLeft = -(this.$slider.find('.bio-slick-list').width() - this.$slider.find('.bio-slick-list__container').width());
    let left = parseInt(this.$slider.find('.bio-slick-list').css('left'), 10);
    return {minLeft, left};
  }

  setPositionLeft(left: number) {
    this.$slider.find('.bio-slick-list').css('left', left + 'px');
  }
  goPrev() {
    let position = this.getPositions();
    let left = position.left;
    left += this.slideStep;
    if (left > 0) left = 0;
    this.setPositionLeft(left);
  }

  goNext() {
    let position = this.getPositions();
    let left = position.left;
    left -= this.slideStep;
    if (left < position.minLeft) left = position.minLeft;
    this.setPositionLeft(left);
  }

}
