'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ImHeart } from 'react-icons/im';
import { LuPenSquare, LuTrash2 } from 'react-icons/lu';
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
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                Please Wait...
            </> : text}
		</Button>
	);
};

export default SubmitButton;

export const CardSignInButton = () => {
	return (
			<SignInButton mode="modal">
				<Button variant="outline" className="p-2 cursor-pointer" asChild suppressHydrationWarning>
				<ImHeart color='#f7a295' size={36} />
				</Button>
			</SignInButton>
	);
};

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

type actionType = "edit" | "delete"
export const IconButton = ({actionType}:{actionType:actionType}) => {
  const { pending } = useFormStatus()
  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare />
      case "delete":
        return <LuTrash2 />
      default:
        const never: never = actionType
      throw new Error(`Invalid action type:  ${never}`)
    }
  }
  return <Button type='submit' size='icon' variant='link' className='p-2 cursor-pointer'>
    {pending ? <ReloadIcon className='animate-spin' /> : renderIcon()}
  </Button>
}