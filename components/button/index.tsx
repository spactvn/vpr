import { Button, Link } from "@chakra-ui/react";

const GradientButton = ({
  text,
  isClipPath = false,
  ...props
}: { text: string; isClipPath?: boolean } & any) => {
  return (
    <Button
      fontSize={"md"}
      fontWeight={600}
      borderRadius={"none"}
      color={"black"}
      bgGradient={
        "linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)"
      }
      _hover={{
        bg: "linear-gradient(90deg, #DA9917 3%, #FFCF25 29%, #FFFF90 50%, #ECBF26 80%)",
      }}
      clipPath={
        isClipPath
          ? "polygon(0% 0%, 0% 100%, 100% 100%, 100% 40%, 90% 0%)"
          : "none"
      }
      {...props}
    >
      {text}
    </Button>
  );
};

export const PancakeButton = ({
  text,
  link,
  isClipPath = false,
  ...props
}: { text: string; link: string; isClipPath?: boolean } & any) => {
  return (
    <Link target={"_blank"} href={link}>
      <Button
        fontSize={"md"}
        fontWeight={600}
        borderRadius={"none"}
        color={"black"}
        bgGradient={
          "linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)"
        }
        _hover={{
          bg: "linear-gradient(90deg, #DA9917 3%, #FFCF25 29%, #FFFF90 50%, #ECBF26 80%)",
        }}
        clipPath={
          isClipPath
            ? "polygon(0% 0%, 0% 100%, 100% 100%, 100% 40%, 90% 0%)"
            : "none"
        }
        {...props}
      >
        {text}
      </Button>
    </Link>
  );
};

export const OutlineButton = ({ text, ...props }: { text: string } & any) => {
  return (
    <Button
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      variant={"outline"}
      {...props}
    >
      {text}
    </Button>
  );
};

export default GradientButton;
