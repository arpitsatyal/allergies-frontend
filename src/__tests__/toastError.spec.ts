import { toastError } from "../utils/toastError";
import { ToastService } from "./../services/toast";

describe("toastError", () => {
  let toast: ToastService;

  beforeEach(() => {
    toast = new ToastService();
    jest.spyOn(toast, "error");
  });

  it("should call toast.error with the error message from the BE if it exists", () => {
    const error = {
      response: {
        data: {
          error: {
            message: "This is an error from the BE"
          }
        }
      }
    };
    toastError(error);
    expect(toast.error).toHaveBeenCalledWith("This is an error from the BE");
  });

  it("should call toast.error with the error object stringified if it is not a string", () => {
    const error = {
      response: {
        data: {
          error: {
            foo: "bar"
          }
        }
      }
    };
    toastError(error);
    expect(toast.error).toHaveBeenCalledWith(JSON.stringify({ foo: "bar" }));
  });

})