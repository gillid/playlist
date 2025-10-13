export const AppIcon: React.FC<{
  light: boolean;
}> = ({ light }) => {
  const color = light ? '#F8FAFC' : '#020618';
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 6H4Z' fill={color} />
      <path
        d='M12 7H13V5H12V6V7ZM4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7V6V5ZM12 6V5H4V6V7H12V6Z'
        fill={color}
      />
      <path d='M17 12H4Z' fill={color} />
      <path
        d='M17 12H4'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M10 18H4Z' fill={color} />
      <path
        d='M10 18H4'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15 3.66682C15 3.54953 15.0347 3.4343 15.1008 3.33277C15.1669 3.23125 15.262 3.14702 15.3764 3.08859C15.4908 3.03016 15.6205 2.99961 15.7525 3C15.8844 3.0004 16.0139 3.03174 16.1279 3.09086L20.6264 5.42337C20.74 5.48193 20.8342 5.56594 20.8998 5.66702C20.9653 5.7681 20.9999 5.88271 21 5.99938C21.0001 6.11605 20.9658 6.23071 20.9004 6.33189C20.8351 6.43307 20.741 6.51723 20.6276 6.57596L16.1279 8.90914C16.0139 8.96826 15.8844 8.9996 15.7525 9C15.6205 9.00039 15.4908 8.96984 15.3764 8.91141C15.262 8.85298 15.1669 8.76875 15.1008 8.66723C15.0347 8.5657 15 8.45047 15 8.33318V3.66682Z'
        fill={color}
      />
    </svg>
  );
};
