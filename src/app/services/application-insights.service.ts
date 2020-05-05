import { Injectable, OnInit } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApplicationInsightsService {
  private routerSubscription: Subscription;

  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: '56efad01-31be-4409-8da5-a267ae0f8479',
      enableAutoRouteTracking: true
    }
  });
  
  constructor(private router: Router) {
    this.appInsights.loadAppInsights();
    this.appInsights.trackPageView(); // Manually call trackPageView to establish the current user/session/pageview

    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof ResolveEnd)).subscribe((event: ResolveEnd) => {
      const activatedComponent = this.getActivatedComponent(event.state.root);
      if (activatedComponent) {
        this.logPageView(`${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}`, event.urlAfterRedirects);
      }
    });
  }

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId, userId, true);
    this.devFlush();
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
    this.devFlush();
  }

  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
    this.devFlush();
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }

  trackEvent(eventName: string){
    this.appInsights.trackEvent({name: eventName});
    this.devFlush();
  }
  
  trackException(errorMessage: string){
    this.appInsights.trackException({exception: new Error(errorMessage)});
    this.devFlush();
  }

  trackTrace(traceMessage: string){
    this.appInsights.trackTrace({message: traceMessage});
    this.devFlush();
  }

  trackMetric(metricMessage: string, metric: number){
    this.appInsights.trackMetric({name: metricMessage, average: metric});
    this.devFlush();
  }

  private devFlush(){
    if(environment.production == false){
      this.appInsights.flush();
    }
  }
}