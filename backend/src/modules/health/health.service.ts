export class HealthService {
  static getStatus() {
    return { status: 'ok', uptime: process.uptime() };
  }
}
