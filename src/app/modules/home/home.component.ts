import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/core/services/admins.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tablesData: any[] = [];
  constructor(private adminService: AdminsService) {}
  ngOnInit() {
    this.getDashboard();
  }
  dashboard!: any;
  data!: any;
  dataArra: any[] = [];
  systemOverviewData: any = {};
  getDashboard() {
    this.adminService.getDashboard().subscribe((res: any) => {
      this.dashboard = res.Data;
      this.data = {
        event: this.dashboard?.Event,
        eventOrganizer: this.dashboard.EventOragnizer,
        users: this.dashboard.Users,
        venue: this.dashboard.Venue,
      };

      this.tablesData = [
        {
          cardName: 'Top Users',
          filterDate: '01 NOV - 07 NOV 2023',
          tableCols: [
            { key: 'FirstName', value: 'User Name' },
            { key: 'Status.Name', value: 'Status' },
          ],
          tableData: this.dashboard.TopUsers,
        },
        {
          cardName: 'Top Event Organizers',
          filterDate: '01 NOV - 07 NOV 2023',
          tableCols: [
            { key: 'Name', value: 'Event Organizer Name' },
            { key: 'NumberOfEvent', value: '# Of Events' },
          ],
          tableData: this.dashboard.TopOrganizers,
        },
        {
          cardName: 'Top Venues',
          filterDate: '01 NOV - 07 NOV 2023',
          tableCols: [
            { key: 'Name', value: 'Venue Name' },
            { key: 'NumberOfEvent', value: '# Of Events' },
          ],
          tableData: this.dashboard.TopVenues,
        },
        {
          cardName: 'Top Categories',
          filterDate: '01 NOV - 07 NOV 2023',
          tableCols: [
            { key: 'Name', value: 'Category' },
            { key: 'NumberOfEvent', value: '# Of Events' },
          ],
          tableData: this.dashboard.TopCategories,
        },
      ];

      this.systemOverviewData = {
        cardName: 'System Overview',
        filterDate: '01 NOV - 07 NOV 2023',
        tableCols: [
          { key: 'Name', value: 'Event Name' },
          { key: 'Category.Name', value: 'Category' },
          { key: 'Venue.Name', value: 'Venue' },
          { key: 'Organizer.Name', value: 'Event Organizer' },
          { key: 'Date', value: 'Event Date' },
        ],
        tableData: res?.Data?.SystemOverview,
      };
    });
  }

  filterDataChange(data: any) {
    let body = {
      count: data.duration.Id,
      categories: data.duration.Id,
      venues: data.duration.Id,
      organizer: data.duration.Id,
      topUsers: data.duration.Id,
      systemOverview: data.duration.Id,
    };
    this.adminService.getFilteredDashboard(body).subscribe((res: any) => {
      this.dashboard = res.Data;

      this.data = {
        event: this.dashboard?.Event,
        eventOrganizer: this.dashboard.EventOragnizer,
        users: this.dashboard.Users,
        venue: this.dashboard.Venue,
      };

      

      this.tablesData = [
        {
          cardName: 'Top Users',
          filterDate: '01 NOV - 07 NOV 2023',
          tableCols: [
            { key: 'FirstName', value: 'User Name' },
            { key: 'Status.Name', value: 'Status' },
          ],
          tableData: this.dashboard.TopUsers,
        },
        {
          cardName: 'Top Event Organizers',
          filterDate: '01 NOV - 07 NOV 2023',
          tableCols: [
            { key: 'Name', value: 'Event Organizer Name' },
            { key: 'NumberOfEvent', value: '# Of Events' },
          ],
          tableData: this.dashboard.TopOrganizers,
        },
        {
          cardName: 'Top Venues',
          filterDate: '01 NOV - 07 NOV 2023',
          tableCols: [
            { key: 'Name', value: 'Venue Name' },
            { key: 'NumberOfEvent', value: '# Of Events' },
          ],
          tableData: this.dashboard.TopVenues,
        },
        {
          cardName: 'Top Categories',
          filterDate: '01 NOV - 07 NOV 2023',
          tableCols: [
            { key: 'Name', value: 'Category' },
            { key: 'NumberOfEvent', value: '# Of Events' },
          ],
          tableData: this.dashboard.TopCategories,
        },
      ];

      this.systemOverviewData = {
        cardName: 'System Overview',
        filterDate: '01 NOV - 07 NOV 2023',
        tableCols: [
          { key: 'Name', value: 'Event Name' },
          { key: 'Category.Name', value: 'Category' },
          { key: 'Venue.Name', value: 'Venue' },
          { key: 'Organizer.Name', value: 'Event Organizer' },
          { key: 'Date', value: 'Event Date' },
        ],
        tableData: res?.Data?.SystemOverview,
      };
    });
  }
}
