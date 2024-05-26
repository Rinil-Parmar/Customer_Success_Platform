class AddJwtToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :jwt_token, :string
  end
end
