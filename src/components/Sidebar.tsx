import { CircleHelp, History, Menu, Plus, Settings } from 'lucide-react';
import { useContext, useState } from 'react';

import { ChatContext } from '@/providers';

import RecentChatItem from './RecentChatItem';
import SidebarMenuItem from './SidebarMenuItem';

const Sidebar = () => {
	const {
		sendPrompt,
		setRecentPrompt,
		startNewChat,
		prevPrompts,
		isGenerating,
	} = useContext(ChatContext);

	const [isExpanded, setIsExpanded] = useState(true);

	const toggleSidebarExpand = () => {
		setIsExpanded((prev) => !prev);
	};

	const loadPrompt = async (prompt: string) => {
		setRecentPrompt(prompt);
		await sendPrompt(prompt);
	};

	return (
		<div
			className={`hidden h-screen max-w-60 flex-col justify-between bg-brand-100 px-4 py-6 duration-500 sm:inline-flex ${
				isExpanded ? 'w-60' : 'w-[4.75rem]'
			}`}
		>
			<div>
				<button
					onClick={toggleSidebarExpand}
					className='grid place-items-center rounded-full p-3'
				>
					<Menu size={14} />
				</button>

				<div
					onClick={!isGenerating ? startNewChat : undefined}
					className={`mt-10 inline-flex h-11 cursor-pointer items-center gap-1 rounded-full bg-brand-200 p-[0.875rem] text-sm text-brand-300 duration-300 ${
						isExpanded ? 'w-[7.25rem]' : 'w-11'
					}`}
				>
					<Plus className='min-w-4' size={16} />
					<p className='line-clamp-1'>New Chat</p>
				</div>

				{isExpanded ? (
					<div className='animate-fade-in flex flex-col'>
						<p className='my-4 ml-1'>Recent</p>

						<div>
							{prevPrompts
								.slice()
								.reverse()
								.map((prompt, idx) => (
									<RecentChatItem
										key={`${prompt} - ${idx}`}
										onClick={
											!isGenerating ? () => loadPrompt(prompt) : undefined
										}
										label={prompt}
									/>
								))}
						</div>
					</div>
				) : null}
			</div>

			<div className='flex flex-col'>
				{[
					{ label: 'Activity', icon: History },
					{ label: 'Help', icon: CircleHelp },
					{ label: 'Settings', icon: Settings },
				].map(({ label, icon }, idx) => (
					<SidebarMenuItem
						key={idx}
						Icon={icon}
						label={label}
						isExpanded={isExpanded}
					/>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
