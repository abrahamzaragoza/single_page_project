class ProductsController < ApplicationController
  before_action :require_signin, except: [:index, :show]
  before_action :find_product, only: [:show, :edit, :update, :destroy]
  before_action :require_owner, only: [:edit, :update, :destroy]

  def index
    @products = Product.all
  end

  def show
    @comment = @product.comments.build
    @comments = @product.comments
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)
    @product.user = current_user
    if @product.save
      flash[:notice] = "Product has been saved"
      redirect_to root_path
    else
      flash.now[:alert] = "Product has not been saved"
      render :new
    end
  end

  def edit; end

  def update
    if @product.update(product_params)
      flash[:notice] = "Product has been updated"
      redirect_to root_path
    else
      flash.now[:alert] = "Product has not been updated"
      render :edit
    end
  end

  def destroy
    @product.destroy
    redirect_to root_path
  end

  private

  def find_product
    begin
      @product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to root_path
    end
  end

  def product_params
    params.require(:product).permit(:name, :price, :description, :image_url, :quantity)
  end

  def require_owner
    unless @product.owned_by?(current_user)
      flash[:alert] = "Access denied!"
      redirect_to root_path
    end
  end
end
