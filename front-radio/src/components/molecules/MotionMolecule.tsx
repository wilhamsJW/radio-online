import { motion, MotionProps, TargetAndTransition, Variants } from 'framer-motion';

interface MotionMoleculeProps extends MotionProps {
  children: React.ReactNode;
  whileHover?: TargetAndTransition; // TargetAndTransition --> que é mais compatível com os tipos esperados 
  whileTap?: TargetAndTransition;
  transition?: TargetAndTransition;
}

const MotionMolecule: React.FC<MotionMoleculeProps> = ({
  children,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.9 },
  transition = { duration: 0.4 },
  ...rest
}) => {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
      {...rest} // Permite passar outras propriedades do MotionProps
    >
      {children}
    </motion.div>
  );
};

export default MotionMolecule;