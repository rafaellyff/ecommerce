class Produto < ApplicationRecord
  belongs_to :categoria

  has_attached_file :foto, styles: { thumb: "50x50#", medium: "200x200#", large: "500x500#"}, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :foto, content_type: /\Aimage\/.*\z/
end
