import { HttpStatus } from '@nestjs/common';

// This DTO defines a standardized structure for all API responses.
// It includes status, success flag, an optional message, and the actual data payload.
export class ApiResponse<T> {
  statusCode: HttpStatus;
  success: boolean;
  message?: string;
  data: T;

  constructor(
    data: T,
    statusCode: HttpStatus = HttpStatus.OK,
    message?: string,
  ) {
    this.data = data;
    this.statusCode = statusCode;
    this.success = Number(statusCode) >= 200 && Number(statusCode) < 300;
    if (message) {
      this.message = message;
    }
  }
}
