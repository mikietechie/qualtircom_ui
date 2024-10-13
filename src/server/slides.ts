/* eslint-disable no-console */
export interface ISlide {
  content: string;
  title: string;
  pageNumber?: number;
}

export interface IParsedGptOutput {
  meta: {
    title: string;
    headline: string;
  };
  slides: ISlide[];
}

export const loadSlides = async (data: IParsedGptOutput) => {
  console.log(data);
  const presentation = SlidesApp.getActivePresentation();
  presentation.getSlides().forEach((slide) => {
    slide.remove();
  });

  const layouts = presentation.getLayouts();
  const coverSlide = presentation.appendSlide(layouts[0]);
  const coverSlideElements = coverSlide.getPageElements();
  coverSlideElements[1].asShape().getText().setText(data.meta.headline);
  const coverSlideElementTitle = coverSlideElements[0].asShape().getText();
  coverSlideElementTitle.setText(data.meta.title);
  coverSlideElementTitle.getTextStyle().setForegroundColor(212, 175, 55);

  data.slides.forEach((item) => {
    const slide = presentation.appendSlide(layouts[0]);
    const slideElements = slide.getPageElements();
    slideElements[0]
      .asShape()
      .getText()
      .setText(`${item.pageNumber} ${item.title}`);
    slideElements[1].asShape().getText().setText(item.content);
    try {
      const lightBg = `#${Math.random().toString(16).substring(2, 8)}`;
      slide.getBackground().setSolidFill(lightBg, 0.3);
    } catch (error) {
      console.log(error);
    }
  });
};

// TODO or not todo
export const uploadPDF = async () => {
  console.log('No longer needed');
};
