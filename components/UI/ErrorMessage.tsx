interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="text-xl text-red-500">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
