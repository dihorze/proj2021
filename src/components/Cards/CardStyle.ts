import { makeStyles, StyleRules } from "@material-ui/styles";
import { cHeight, cWidth } from "../../data/Battlefield";
import { Point } from "../../model/positioning";

interface CardStyleProps {
  loc: Point;
  origin: Point;
  width: number;
  height: number;
  deg: number;
  offsetY: number;
  offsetX: number;
  isSelected: boolean;
  isHovered: boolean;
  isMoving: boolean;
  isEntered: boolean;
  isExiting: boolean;
  isOnCards: boolean;
  isAiming: boolean;
  refLoc: Point;
  slideInDuration: number;
  slideOutDuration: number;
  innerWidth: number;
}

const getCardTransform = (props: CardStyleProps) => {
  const { deg, offsetX, offsetY, isHovered, isSelected, isEntered, isExiting } =
    props;
  if (!isEntered) {
    return `scale(0.3) rotate(${-deg}deg)`;
  }
  if (isExiting) {
    return "scale(0.01) rotate(0.4turn)";
  }
  if (isSelected) return `scale(1.3)`;
  else if (isHovered) return `translateY(${-offsetY - 30}px) scale(1.3)`;
  else return `translateX(${offsetX}px) rotate(${deg}deg)`;
};

const getOffsetPath = (props: CardStyleProps) => {
  if (props.isExiting) {
    const { loc, refLoc, width, height, innerWidth } = props;

    const baseTransform = Point.at(loc?.x - refLoc?.x, loc?.y - refLoc?.y);
    const offset = Point.at(width / 2, height / 2);
    const p1 = baseTransform.add(offset);
    const p2 = Point.at(innerWidth / 2, 50).add(offset);
    const cp1 = Point.at(
      baseTransform.x,
      -0.2 * baseTransform.x + baseTransform.y
    ).add(offset);
    const cp2 = Point.at(0, 0.1 * baseTransform.x - 50).add(offset);

    return `path('M ${p2.x} ${p2.y} C ${cp2.x} ${cp2.y}, ${cp1.x} ${cp1.y}, ${p1.x} ${p1.y}')`;
  }

  const { loc, refLoc, width, height, innerWidth } = props;
  const baseTransform = Point.at(loc?.x - refLoc?.x, loc?.y - refLoc?.y);
  const offset = Point.at(width / 2, height / 2);
  const p1 = Point.at(-innerWidth / 2, 50).add(offset);
  const p2 = baseTransform.add(offset);
  const cp1 = Point.at(0, -0.1 * baseTransform.x).add(offset);
  const cp2 = Point.at(0, 0.1 * baseTransform.x + baseTransform.y).add(offset);

  return `path('M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}')`;
};

const getTransition = (props: CardStyleProps) => {
  if (props.isExiting) {
    return `offset-distance ${props.slideOutDuration}ms ease-in, transform ${props.slideOutDuration}ms ease-out, opacity ${props.slideOutDuration}ms ease-in`;
  }

  const {
    isSelected,
    isMoving,
    isHovered,
    isOnCards,
    isAiming,
    isEntered,
    slideInDuration,
  } = props;

  return (
    "all " +
    (isAiming
      ? "300ms"
      : isMoving
      ? "0ms"
      : isHovered
      ? "30ms"
      : isSelected
      ? "100ms"
      : isOnCards
      ? "300ms"
      : isEntered
      ? `${slideInDuration}ms ease-out`
      : "100ms linear")
  );
};

export class CardStyle implements CardStyleProps {
  constructor(
    public loc = Point.at(0, 0),
    public origin = Point.at(0, 0),
    public width = cWidth,
    public height = cHeight,
    public deg = 0,
    public offsetY = 0,
    public offsetX = 0,
    public isSelected = false,
    public isHovered = false,
    public isMoving = false,
    public isEntered = false,
    public isExiting = false,
    public isOnCards = false,
    public isAiming = false,
    public refLoc = Point.at(0, 0),
    public slideInDuration = 0,
    public slideOutDuration = 0,
    public innerWidth = 0
  ) {}

  useStyles = makeStyles({
    card: {
      opacity: ({ isEntered, isExiting }: CardStyleProps) =>
        isEntered && !isExiting ? "1" : "0",
      position: "fixed",
      top: ({ refLoc }: CardStyleProps) => refLoc?.y,
      left: ({ refLoc }: CardStyleProps) => refLoc?.x,
      transition: getTransition,
      transformOrigin: "center",
      transform: getCardTransform,

      zIndex: ({ isHovered, isSelected }: any) =>
        isHovered || isSelected ? "100" : "auto",

      offsetPath: getOffsetPath,
      offsetDistance: ({ isEntered, isExiting }: any) =>
        isEntered && !isExiting ? "100%" : "0%",
      offsetRotate: "0deg",

      // willChange: "transform"
    },

    cardStatic: {
      borderRadius: 2,
      width: ({ width }: any) => width,
      height: ({ height }: any) => height,
      padding: 7,
      fontSize: 24,
      fontWeight: "bold",
      backgroundImage: "url('./assets/card2.png')",
      backgroundSize: "cover",
      transition: "transform 0.1s",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    cardStaticNoHover: {
      borderRadius: 2,
      width: ({ width }: any) => width,
      height: ({ height }: any) => height,
      padding: 7,
      fontSize: 24,
      fontWeight: "bold",
      backgroundImage: "url('./assets/card2.png')",
      backgroundSize: "cover",
    },
  } as StyleRules);

  static init() {
    return new CardStyle();
  }

  withCardLocation(loc: Point, refLoc: Point) {
    this.loc = loc;
    this.refLoc = refLoc;
    return this;
  }

  withSymmetryOrigin(origin: Point) {
    this.origin = origin;
    return this;
  }

  withSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    return this;
  }

  withRotateAngle(deg: number) {
    this.deg = deg;
    return this;
  }

  withOffsets(hoverOffsets: Point, pushawayOffsets: Point) {
    this.offsetX = pushawayOffsets ? pushawayOffsets.x : 0;
    this.offsetY = hoverOffsets ? hoverOffsets.y : 0;
    return this;
  }

  withAnimationStates(
    isSelected: boolean,
    isHovered: boolean,
    isMoving: boolean,
    isEntered: boolean,
    isExiting: boolean,
    isOnCards: boolean,
    isAiming: boolean
  ) {
    this.isSelected = isSelected;
    this.isHovered = isHovered;
    this.isMoving = isMoving;
    this.isEntered = isEntered;
    this.isExiting = isExiting;
    this.isOnCards = isOnCards;
    this.isAiming = isAiming;
    return this;
  }

  withAnimationDuration(slideIn: number, slideOut: number) {
    this.slideInDuration = slideIn;
    this.slideOutDuration = slideOut;
    return this;
  }

  withScreenSize(innerWidth: number, innerHeight: number) {
    this.innerWidth = innerWidth;
    return this;
  }

  generateClasses() {
    return this.useStyles({
      loc: this.loc,
      origin: this.origin,
      width: this.width,
      height: this.height,
      deg: this.deg,
      offsetY: this.offsetY,
      offsetX: this.offsetX,
      isSelected: this.isSelected,
      isHovered: this.isHovered,
      isMoving: this.isMoving,
      isEntered: this.isEntered,
      isExiting: this.isExiting,
      isOnCards: this.isOnCards,
      isAiming: this.isAiming,
      refLoc: this.refLoc,
      slideInDuration: this.slideInDuration,
      slideOutDuration: this.slideOutDuration,
      innerWidth: this.innerWidth,
    });
  }
}

// card content styles

interface ContentStyleProps {
  title: string;
  description: string;
  width: number;
}


const getCostFontSize = (props: ContentStyleProps) => {
  const { width } = props;
  return `${(15 * width) / cWidth}pt`;
};

const getTitleFontSize = (props: ContentStyleProps) => {
  const { title, width } = props;
  const n = title.length;
  return `${Math.min((width / n) * 0.85, (9 * width) / cWidth)}pt`;
};

const getTypeFontSize = (props: ContentStyleProps) => {
  const { width } = props;
  return `${(5 * width) / cWidth}pt`;
};

const getTextFontSize = (props: ContentStyleProps) => {
  const { description, width } = props;
  const n = description.length;
  return `${Math.min((4.1 * width) / n, (8 * width) / cWidth)}pt`;
};

export class CardContentStyle implements ContentStyleProps {
  useStyles = makeStyles({
    // card content
    ctn: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    firstRow: {
      width: "100%",
      height: "13%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    cost: {
      fontSize: getCostFontSize,
      marginLeft: "0%",
      width: "20%",
      textAlign: "center",
      fontWeight: "bolder",
      color: "darkgreen",
    },
    title: {
      fontSize: getTitleFontSize,
      textAlign: "center",
      height: "100%",
      width: "74%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    type: {
      fontSize: getTypeFontSize,
      width: "40%",
      margin: "2% 25% 1% 0",
      fontWeight: "bolder",
      textAlign: "center",
    },
    img: {
      width: "85%",
      margin: "0 0 9% 0",
      borderRadius: "1px",
      border: "1px solid #6e5d3c",
    },
    text: {
      fontSize: getTextFontSize,
      padding: "5px",
      width: "91%",
      margin: "0 5%",
      textAlign: "justify",
    },
  });

  constructor(
    public title = "",
    public description = "",
    public width = cWidth
  ) {}

  static init() {
    return new CardContentStyle();
  }

  withContent(title: string, description: string) {
    this.title = title;
    this.description = description;
    return this;
  }

  withViewportWidth(width: number) {
    this.width = width;
    return this;
  }

  generateClasses() {
    return this.useStyles({
      title: this.title,
      description: this.description,
      width: this.width,
    });
  }
}
