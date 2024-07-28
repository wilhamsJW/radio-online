import { Button, ButtonProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface SubmitButtonProps extends ButtonProps {
  isLoading: boolean;
  onClick: () => void;
  buttonText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, onClick, buttonText, ...rest }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Button
      type="submit"
      colorScheme="green"
      size="lg"
      fontSize="md"
      width="full"
      rounded="full"
      onClick={onClick}
      disabled={isLoading}
      {...rest} // Adiciona quaisquer outras props passadas ao Button
    >
      {isLoading ? "Loading..." : buttonText}
    </Button>
  </motion.div>
);

export default SubmitButton;