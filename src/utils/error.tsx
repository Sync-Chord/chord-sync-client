interface GenericError {
  message: string;
  status: number;
}

const generic_error: GenericError = {
  message: "Something went wrong!",
  status: 500,
};

type ErrorResponse = {
  response?: any; // You can specify a more detailed type if you know the structure of the response
};

const default_catch = (error: ErrorResponse, resolve: (value: any) => void): void => {
  if (error.response) {
    resolve(error.response);
  } else {
    resolve(generic_error);
  }
};

export default default_catch;
