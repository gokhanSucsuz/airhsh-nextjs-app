'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuPenSquare } from 'react-icons/lu';
import { ImHeart } from 'react-icons/im';
type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
	className?: string;
	text?: string;
	size?: btnSize;
};
const SubmitButton = ({ className, text = "Submit", size="lg" }: SubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className={`capitalize ${className}`}
			disabled={pending}
			size={size}
		>
            {pending ? <>
                
                Please Wait...
            </> : text}
		</Button>
	);
};

export default SubmitButton;

// export const CardSignInButton = () => {
// 	return (
// 			<SignInButton mode="modal">
// 				<Button variant="outline" className="p-2 cursor-pointer" asChild suppressHydrationWarning>
// 				<ImHeart size={36} />
// 				</Button>
// 			</SignInButton>
// 	);
// };

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};