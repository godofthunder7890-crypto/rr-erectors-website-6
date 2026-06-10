import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { fadeUp, scaleIn } from '@/lib/animations';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <motion.p
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="text-8xl md:text-9xl font-black text-primary/20 mb-4"
        >
          404
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4"
        >
          Page Not Found
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-8 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Link href="/">
            <Button size="lg" className="font-bold uppercase tracking-widest">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
