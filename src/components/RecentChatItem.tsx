import { MessageSquare } from 'lucide-react';

type RecentChatItemProps = React.HTMLAttributes<HTMLDivElement> & {
	label: string;
};

const RecentChatItem = ({ label, ...props }: RecentChatItemProps) => {
	return (
		<div
			className='flex cursor-pointer items-center justify-start gap-2 rounded-full px-3 py-2 text-sm text-gray-600 duration-300 hover:bg-brand-200'
			{...props}
		>
			<MessageSquare className='min-w-4' size={16} />
			<p className='line-clamp-1'>{label}</p>
		</div>
	);
};

export default RecentChatItem;
