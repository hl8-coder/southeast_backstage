import Vue from 'vue'
import {
  Row,
  Col,
  Button,
  Notification,
  Message,
  Carousel,
  CarouselItem,
  Input,
  InputNumber,
  Select,
  Option,
  Form,
  FormItem,
  Checkbox,
  CheckboxGroup,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tabs,
  TabPane,
  Popover,
  Header,
  Container,
  Main,
  Switch,
  DatePicker,
  Table,
  TableColumn,
  Dialog,
  Link,
  MessageBox,
  Pagination,
  Icon,
  Upload,
  Loading,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
  Badge,
  Image,
  Alert,
  Autocomplete,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Progress,
  TimeSelect,
  TimePicker,
  Tree
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Notification.name, Notification)
Vue.component(Message.name, Message)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Popover.name, Popover)
Vue.component(Header.name, Header)
Vue.component(Container.name, Container)
Vue.component(Main.name, Main)
Vue.component(Switch.name, Switch)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Dialog.name, Dialog)
Vue.component(Link.name, Link)
Vue.component(Pagination.name, Pagination)
Vue.component(Icon.name, Icon)
Vue.component(Upload.name, Upload)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Radio.name, Radio)
Vue.component(Badge.name, Badge)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Radio.name, Radio)
Vue.component(Image.name, Image)
Vue.component(Alert.name, Alert)
Vue.component(Avatar.name, Avatar)
Vue.component(Tag.name, Tag)
Vue.component(Progress.name, Progress)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(TimeSelect.name, TimeSelect)
Vue.component(TimePicker.name, TimePicker)
Vue.component(Tree.name, Tree)
Vue.directive('vLoading', Loading.install)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
