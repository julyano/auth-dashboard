export class ResourceModel {
  id: number = 0;
  uuid: string = '';
  created_by_id: number = 0;
  updated_by_id: number = 0;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  deleted_at: Date = new Date();
}
