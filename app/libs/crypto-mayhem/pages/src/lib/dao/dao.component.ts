import { Component } from '@angular/core';

@Component({
  templateUrl: './dao.component.html',
  styleUrls: ['./dao.component.scss'],
})
export class DaoComponent {
  tabs: string[] = ['DAO.TABS.INFO', 'DAO.TABS.VOTING', 'DAO.TABS.HISTORY'];
  activeTab = 0;

  constructor() {}
}
