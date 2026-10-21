import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Avatar } from '../../../shared/ui/avatar/avatar';
import { Button } from '../../../shared/ui/button/button';
import { Icon } from '../../../shared/ui/icon/icon';

/** First onboarding screen (BookIt "01 Welcome"). */
@Component({
  selector: 'app-welcome',
  imports: [Avatar, Button, Icon, RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Welcome {
  /** Service icons shown in the hero card; the second one is highlighted. */
  protected readonly heroIcons = [
    'cleaning_services',
    'bolt',
    'water_drop',
    'mode_fan',
    'content_cut',
    'kitchen',
  ];
  protected readonly promises = [
    'Upfront prices, no surprises at the door',
    'Real reviews from your neighbourhood',
  ];
}
